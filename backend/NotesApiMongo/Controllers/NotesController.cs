using Microsoft.AspNetCore.Mvc;
using NotesApiMongo.Models;
using NotesApiMongo.Services;

namespace NotesApiMongo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly NotesService _notesService;

    public NotesController(NotesService notesService)
    {
        _notesService = notesService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Note>>> Get() =>
        await _notesService.GetAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Note>> Get(string id)
    {
        var note = await _notesService.GetAsync(id);

        if (note is null) return NotFound();

        return note;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Note newNote)
    {
        newNote.CreatedAt = DateTime.UtcNow;
        await _notesService.CreateAsync(newNote);

        return CreatedAtAction(nameof(Get), new { id = newNote.Id }, newNote);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(string id, Note updatedNote)
    {
        var existingNote = await _notesService.GetAsync(id);
        if (existingNote is null) return NotFound();

        updatedNote.Id = id;
        updatedNote.CreatedAt = existingNote.CreatedAt;

        await _notesService.UpdateAsync(id, updatedNote);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var note = await _notesService.GetAsync(id);

        if (note is null) return NotFound();

        await _notesService.DeleteAsync(id);

        return NoContent();
    }
}
