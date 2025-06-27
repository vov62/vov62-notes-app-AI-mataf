using NotesApiMongo.Services;

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

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// ✨ הפעלת CORS (לפני UseAuthorization!)
app.UseCors("AllowAngularApp");

// מפנה את הפניה ל HTTPS
// app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
