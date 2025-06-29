using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NotesApiMongo.Models;
using NotesApiMongo.Services;

namespace NotesApiMongo.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;
    private readonly JwtService _jwtService;

    public AuthController(UserService userService, JwtService jwtService)
    {
        _userService = userService;
        _jwtService = jwtService;
    }


    [HttpPost("register")]
    [AllowAnonymous]
    public IActionResult Register([FromBody] UserDto request)
    {

        Console.WriteLine($"Register called with username={request.Username}, password={request.Password}");

        if (_userService.GetUser(request.Username) is not null)
            return BadRequest("המשתמש כבר קיים");

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
        // יצירת משתמש חדש עם סיסמה מוצפנת
        var user = new User
        {
            Username = request.Username,
            PasswordHash = hashedPassword
        };
        _userService.AddUser(user);
        return Ok("נרשמת בהצלחה");
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public IActionResult Login([FromBody] UserDto request)
    {

        var user = _userService.GetUser(request.Username);

        if (user is null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized("שם משתמש או סיסמה שגויים");

        var token = _jwtService.GenerateToken(user.Username);

        return Ok(new { token });
    }
}
