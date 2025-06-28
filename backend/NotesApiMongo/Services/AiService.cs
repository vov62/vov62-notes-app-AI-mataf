using System.Text.Json;
using System.Net.Http.Headers;

namespace NotesApiMongo.Services;

public class AiService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AiService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClient = httpClientFactory.CreateClient();
        _apiKey = Environment.GetEnvironmentVariable("GEMINI_API_KEY")
                  ?? configuration["GEMINI_API_KEY"]
                  ?? throw new Exception("API Key לא מוגדר");
    }

    public async Task<string> GenerateNoteAsync(string prompt)

    {
        var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={_apiKey}";
        var promptText = $"אתה עוזר אישי שמנסח פתקים יומיים. ניסח מחדש את הטקסט הבא בצורה ברורה, תמציתית ועם טון חיובי:\n\n{prompt}";

        var requestBody = new
        {
            contents = new[]
            {
                new
                {
                    role ="user",
                    parts = new[]
                    {
                        new { text = promptText }
                    }
                }
            },
            generationConfig = new
            {
                temperature = 0.7,
                maxOutputTokens = 60
            }
        };



        var response = await _httpClient.PostAsJsonAsync(url, requestBody);
        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"Gemini API error: {response.StatusCode}, {error}");
        }

        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        return json.GetProperty("candidates")[0]
                   .GetProperty("content")
                   .GetProperty("parts")[0]
                   .GetProperty("text")
                   .GetString()!;
    }
}
