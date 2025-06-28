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
}

public class NotePrompt
{
    public string Text { get; set; } = "";
}
