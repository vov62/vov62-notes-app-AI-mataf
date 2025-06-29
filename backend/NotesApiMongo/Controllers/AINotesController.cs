
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApiMongo.Services;

namespace NotesApiMongo.Controllers;

[ApiController]
[Route("api/ai")]
public class AiNotesController : ControllerBase
{
    private readonly AiService _aiService;
    private readonly ILogger<AiNotesController> _logger;

    public AiNotesController(AiService aiService, ILogger<AiNotesController> logger)
    {
        _aiService = aiService;
        _logger = logger;
    }

    [HttpPost("suggest")]
    public async Task<IActionResult> Suggest([FromBody] NotePrompt prompt)
    {
        try
        {
            var suggestion = await _aiService.GenerateNoteAsync(prompt.Text);
            return Ok(new { content = suggestion });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "שגיאה בהצעת ניסוח");
            return StatusCode(500, new { message = "AI suggestion failed", error = ex.Message });
        }
    }

    [HttpPost("speech-to-text")]
    public async Task<IActionResult> SpeechToText(IFormFile audioFile)
    {
        if (audioFile == null || audioFile.Length == 0)
            return BadRequest("קובץ לא תקין");

        using var httpClient = new HttpClient();
        using var form = new MultipartFormDataContent();
        var streamContent = new StreamContent(audioFile.OpenReadStream());
        streamContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("audio/wav");
        form.Add(streamContent, "file", audioFile.FileName);
        form.Add(new StringContent("whisper-1"), "model");

        httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "<OPENAI_API_KEY>");

        var response = await httpClient.PostAsync("https://api.openai.com/v1/audio/transcriptions", form);
        var result = await response.Content.ReadAsStringAsync();

        return Ok(result);
    }
}

public class NotePrompt
{
    public string Text { get; set; } = "";
}
