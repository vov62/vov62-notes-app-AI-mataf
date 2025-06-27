using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NotesApiMongo.Models;

public class Note
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Content { get; set; } = string.Empty;
    public string Color { get; set; } = "yellow";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
