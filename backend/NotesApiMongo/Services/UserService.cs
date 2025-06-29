using NotesApiMongo.Models;

namespace NotesApiMongo.Services;

public class UserService
{
    private readonly List<User> _users = new();

    public User? GetUser(string username) =>
        _users.FirstOrDefault(u => u.Username == username);

    public void AddUser(User user) => _users.Add(user);

    public bool IsValidUser(string username, string password) =>
        _users.Any(u => u.Username == username && BCrypt.Net.BCrypt.Verify(password, u.PasswordHash));
}