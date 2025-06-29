// using Xunit;
// using Moq;
// using MongoDB.Driver;
// using System.Threading;
// using System.Threading.Tasks;
// using NotesApiMongo.Models;
// using NotesApiMongo.Services;

// public class NotesServiceTests
// {
//     [Fact]
//     public async Task CreateAsync_CallsInsertOneOnce()
//     {
//         // Arrange – מכינים Mock של IMongoCollection<Note>
//         var mockCollection = new Mock<IMongoCollection<Note>>();

//         // נגדיר ש‑InsertOneAsync לא באמת עושה כלום
//         mockCollection
//             .Setup(c => c.InsertOneAsync(
//                 It.IsAny<Note>(),
//                 It.IsAny<InsertOneOptions?>(),
//                 It.IsAny<CancellationToken>()))
//             .Returns(Task.CompletedTask);

//         // יוצרים את השירות עם הקונסטרקטור החדש
//         var service = new NotesService(mockCollection.Object);

//         var note = new Note
//         {
//             Content = "בדיקת טסט",
//             Color = "yellow",
//             Username = "avi"
//         };

//         // Act
//         await service.CreateAsync(note);

//         // Assert – Verify שנקרא פעם אחת בדיוק
//         mockCollection.Verify(c => c.InsertOneAsync(
//                 It.Is<Note>(n => n.Content == "בדיקת טסט"),
//                 null,
//                 default),
//             Times.Once);
//     }
// }
