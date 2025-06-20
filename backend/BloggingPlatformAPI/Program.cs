// Author: Ksenia Pominova //
// Student number: W2105604 //

//Imports
using GothamPostBlogAPI.Data; //Allow access to ApplicationDbContext.cs to handle database operations (project files)
using GothamPostBlogAPI.Services; //Business logic services import (project files)
using Microsoft.AspNetCore.Authentication.JwtBearer; //Enables JWT authentication to verify users with JWT tokens (security)
using Microsoft.AspNetCore.Authorization; //Allows to control API endpoints by defining access levels 
using Microsoft.AspNetCore.Builder; //Configuration middleware (authentication, routing, Swagger; core API)
using Microsoft.AspNetCore.Hosting; //Allows API to run as a web service 
using Microsoft.AspNetCore.Mvc; //Handles API Controllers (how requests and responses are managed; core API)
using Microsoft.EntityFrameworkCore; //Enable database connectivity using EF Core 
using Microsoft.Extensions.Configuration; //Loads app settings from appsettings.json (core API)
using Microsoft.Extensions.DependencyInjection; //Register services (DbContext, AuthService, etc; core API)
using Microsoft.Extensions.Hosting; //Manages API lifecycle (start, stop, or restart; core API)
using Microsoft.IdentityModel.Tokens; //Verifies JWT validity 
using Microsoft.OpenApi.Models; //Enables Swagger for API documentation and testing directly from a browser
using System.Text; //Converts secret keys into bytes for token signing 
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging; //ILogger 
using AspNetCoreRateLimit;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

//Load Configuration (Ensure `appsettings.json` contains JWT Secret & DB Connection)
var configuration = builder.Configuration;

//Register Database Context (use SQLite)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(configuration.GetConnectionString("DefaultConnection"))); //Usage of EF Core to let the API communicate with SQLite to store and retrieve data

//environment variables 
//Add Authentication using JWT Bearer Token
//JWT JSON Web Token securely authenticates users in web application 
//Once user logs in, API generates JWT and send it to the client; JWT is included in the Authorization header in future requests 
var jwtSecretKey = configuration["Jwt:SecretKey"];
if (string.IsNullOrEmpty(jwtSecretKey) || jwtSecretKey.Length < 32)
{
    throw new InvalidOperationException("JWT SecretKey is too short! It must be at least 32 characters.");
} //If the JWT:Secret Key is missing, the app will throw an exception instead of null value 

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme) //Enable JWT authentication 
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;

        // Read JWT from the cookie (jwt) instead of looking for Authorzation header 
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                // Read the token from the "jwt" cookie
                var token = context.Request.Cookies["jwt"];
                if (!string.IsNullOrEmpty(token))
                {
                    Console.WriteLine("Token from cookie: " + token);
                    context.Token = token;
                }
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true, //Ensure the token belongs to this API (created by this API)
            ValidateAudience = true, //Ensure the token is for this API
            ValidateLifetime = true, //Ensure the token hasn't expired 
            ValidateIssuerSigningKey = true, //Verify the token signature (signed with the secret key)
            ValidIssuer = builder.Configuration["Jwt:Issuer"], //From appsettings.json (who created the token)
            ValidAudience = builder.Configuration["Jwt:Audience"], //From appsettings.json (who should use the token)
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"] ?? "DefaultSecureKey123456")), //Secret key for signing 
            ClockSkew = TimeSpan.Zero, // Ensures token expiration is precise
            NameClaimType = ClaimTypes.Name,
            RoleClaimType = ClaimTypes.Role
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

//Register Services for Dependency Injection
builder.Services.AddScoped<AuthService>(); //Scoped (AddScoped): Services are created per request (useful for database operations)
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<BlogPostService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<CommentService>();
builder.Services.AddScoped<LikeService>();

//Add Controllers
builder.Services.AddControllers().AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173" //frontend port 
                                                       // "https://tangerine-centaur-61bb46.netlify.app"
            )
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials(); //HTTP-only cookies 
        });
});

//RATE LIMITING SERVICES 
builder.Services.AddMemoryCache();
builder.Services.Configure<IpRateLimitOptions>(options =>
{
    options.GeneralRules = new List<RateLimitRule>
    {
        new RateLimitRule
        {
            Endpoint = "*",
            Period = "30s", //1 minute
            Limit = 200 //Allow max 10 requests per minute
        }
    };
});

builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>(); //Singleton (AddSingleton): Services are reused (for things like caching & rate-limiting).
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();

// Configure Swagger for API Documentation; automatic API docs generation and testing 
builder.Services.AddEndpointsApiExplorer(); //Enable Swagger for API testing
builder.Services.AddSwaggerGen(options => //Adds Swagger UI
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Gotham Post Blog API",
        Version = "v1",
        Description = "API for managing users, blog posts, comments, and likes.",
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token here"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new List<string>()
        }
    });
});

//Register logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole(); //Adds logging to the console

//Build the App (after all services are registered)
var app = builder.Build();

// Apply pending migrations automatically at startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();  //Applies migrations automatically
}

//Configure the HTTP request pipeline; enable Swagger in all enivronments
if (app.Environment.IsDevelopment() || app.Environment.IsProduction()) // Ensure it works in production too
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "GothamPostBlog API v1"); //Where to find the JSON documentation for API 
        c.RoutePrefix = "swagger"; // Swagger URL: http://localhost:5113/swagger -Interface to test all API endpoints 
    });
}

// Global Error Handling Middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        var errorMessage = new { error = "An unexpected error occurred." };
        await context.Response.WriteAsJsonAsync(errorMessage);
    });
});
//Enable Rate Limiting to prevent API abuse
app.Use(async (context, next) =>
{
    var clientIp = context.Connection.RemoteIpAddress?.ToString();
    if (string.IsNullOrEmpty(clientIp))
    {
        await next();
        return;
    }

    // Simple rate limit: Allow max 10 requests per minute
    var cacheKey = $"RateLimit:{clientIp}";
    var requestCount = context.Items.ContainsKey(cacheKey) ? (int)context.Items[cacheKey]! : 0;

    if (requestCount >= 10) //Rate Limiting (Limits API abuse by allowing only 10 requests per minute per client) 
    {
        context.Response.StatusCode = 429; // Too Many Requests
        await context.Response.WriteAsync("Rate limit exceeded. Try again later.");
        return;
    }

    context.Items[cacheKey] = requestCount + 1;
    await next();
});

//Middleware pipeline 
// Enable routing
app.UseRouting();
app.UseHttpsRedirection();

//Inject JWT from Cookie into Authorization header BEFORE Authentication runs
app.Use(async (context, next) =>
{
    var token = context.Request.Cookies["jwt"];
    if (!string.IsNullOrEmpty(token))
    {
        Console.WriteLine("JWT from cookie injected into Authorization header");
        context.Request.Headers.Authorization = "Bearer " + token;
    }
    else
    {
        Console.WriteLine("No JWT cookie found.");
    }
    await next();
});

//CORS (Cross-Origin Resource Sharing) and Rate Limiting to enhance security
//CORS prevents unauthorized domains from accessing your API
//Enable CORS (Allow frontend requests)
//app.UseCors(policy =>
// policy.AllowAnyOrigin() // Allows requests from any domain
//    .AllowAnyMethod() // Allows GET, POST, PUT, DELETE
//    .AllowAnyHeader()); // Allows any headers

app.UseCors("AllowFrontend");
//app.UseCors("AllowNetlify");

app.UseAuthentication();
app.UseAuthorization();

app.UseIpRateLimiting(); // Enable rate limiting

app.MapControllers();

//app.Urls.Add("http://+:8080");

//using (var scope = app.Services.CreateScope())
//{
   // var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    //try
    //{
        // This will create the database and apply all pending migrations
      //  context.Database.Migrate();
      //  Console.WriteLine("Database migration completed successfully.");
   // }
   // catch (Exception ex)
   // {
   //     Console.WriteLine($"Database migration failed: {ex.Message}");
   //     // Log the error but don't crash the app
  //  }
//}

//start the app 
app.Run();

//Logging in process
//POST /api/auth/login 
//API generates the JWT with the User's ID and Role 
//API sends the JWT back to client 
//Client stores the JWT locally/ sends Authorization headers 
//Future requests include the JWT 
//API will verify the JWT before allowing access