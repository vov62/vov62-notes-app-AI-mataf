using MongoDB.Driver;
using NotesApiMongo.Models;

namespace NotesApiMongo.Services;


public class NotesService
{
    private readonly IMongoCollection<Note> _notesCollection;

    public NotesService(IConfiguration configuration)
    {
        var settings = configuration.GetSection("NotesDatabase").Get<NotesDatabaseSettings>();

        var client = new MongoClient(settings!.ConnectionString);
        var database = client.GetDatabase(settings.DatabaseName);
        _notesCollection = database.GetCollection<Note>(settings.NotesCollectionName);
    }

    public async Task<List<Note>> GetByUsernameAsync(string username) =>
        await _notesCollection.Find(n => n.Username == username).ToListAsync();


    public async Task<List<Note>> GetAsync() =>
        await _notesCollection.Find(_ => true).ToListAsync();

    public async Task<Note?> GetAsync(string id) =>
        await _notesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Note newNote) =>
        await _notesCollection.InsertOneAsync(newNote);

    public async Task UpdateAsync(string id, Note updatedNote) =>
        await _notesCollection.ReplaceOneAsync(x => x.Id == id, updatedNote);

    public async Task DeleteAsync(string id) =>
        await _notesCollection.DeleteOneAsync(x => x.Id == id);
}


