namespace NotesApiMongo.Models;

public class NotesDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string NotesCollectionName { get; set; } = null!;
}
