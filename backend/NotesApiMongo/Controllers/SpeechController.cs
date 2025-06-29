using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

[ApiController]
[Route("api")]
public class SpeechController : ControllerBase
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public SpeechController(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    [HttpPost("speech-to-text")]
    public async Task<IActionResult> SpeechToText()
    {
        var form = await Request.ReadFormAsync();
        var file = form.Files["audio"];
        if (file == null)
        {
            return BadRequest("לא נשלח קובץ");
        }

        using var content = new MultipartFormDataContent();
        var fileContent = new StreamContent(file.OpenReadStream());
        fileContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
        content.Add(fileContent, "file", file.FileName);
        content.Add(new StringContent("whisper-1"), "model");

        var apiKey = _config["OpenAI:ApiKey"];
        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        var response = await _httpClient.PostAsync("https://api.openai.com/v1/audio/transcriptions", content);
        var result = await response.Content.ReadAsStringAsync();

        return Ok(result);
    }
}
