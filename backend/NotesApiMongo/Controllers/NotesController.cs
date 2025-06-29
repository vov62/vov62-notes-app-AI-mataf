using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using NotesApiMongo.Models;
using NotesApiMongo.Services;
using Microsoft.AspNetCore.Authorization;


namespace NotesApiMongo.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotesController : ControllerBase
{
    private readonly NotesService _notesService;

    public NotesController(NotesService notesService) => _notesService = notesService;

    [HttpGet]
    public async Task<ActionResult<List<Note>>> Get()
    {
        var username = User.FindFirstValue(ClaimTypes.Name)!;
        return await _notesService.GetByUsernameAsync(username);
    }

    [HttpPost]
    public async Task<IActionResult> Post(NoteDto noteDto)
    {
        var newNote = new Note
        {
            Content = noteDto.Content,
            Color = noteDto.Color,
            CreatedAt = DateTime.UtcNow,
            Username = User.FindFirstValue(ClaimTypes.Name)!
        };

        await _notesService.CreateAsync(newNote);
        return CreatedAtAction(nameof(Get), new { id = newNote.Id }, newNote);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, Note updatedNote)
    {
        var existing = await _notesService.GetAsync(id);
        var username = User.FindFirstValue(ClaimTypes.Name);

        if (existing is null || existing.Username != username)
            return Unauthorized();

        updatedNote.Id = id;
        updatedNote.Username = username!;
        updatedNote.CreatedAt = existing.CreatedAt;

        await _notesService.UpdateAsync(id, updatedNote);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var note = await _notesService.GetAsync(id);
        var username = User.FindFirstValue(ClaimTypes.Name);

        if (note is null || note.Username != username)
            return Unauthorized();

        await _notesService.DeleteAsync(id);
        return NoContent();
    }

}


