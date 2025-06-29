using NotesApiMongo.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

//  קונפיגורציית MongoDB
builder.Services.Configure<NotesApiMongo.Models.NotesDatabaseSettings>(
    builder.Configuration.GetSection("NotesDatabase"));

// הוספת שירותי Notes
builder.Services.AddSingleton<NotesService>();

// Controllers ו-Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ai service
builder.Services.AddHttpClient();
builder.Services.AddSingleton<AiService>();

// user service
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<JwtService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = builder.Configuration["Jwt:Key"];
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!))
        };
    });

builder.Services.AddAuthorization();


var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// ✨ הפעלת CORS (לפני UseAuthorization!)
app.UseCors("AllowAngularApp");

// מפנה את הפניה ל HTTPS
// app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
