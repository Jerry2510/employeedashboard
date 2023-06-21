using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;

        public LoginController(UserDbContext userDbContext)
        {
            _userDbContext=userDbContext;
        }
        [HttpGet("Users")]

        public IActionResult GetUser()
        {
            var userdetails=_userDbContext.userModels.AsQueryable();
            return Ok(userdetails);
        }

        [HttpPost("signup")]

        public IActionResult SignUp([FromBody] UserModel userobj)
        {
            if(userobj == null)
            {
                return BadRequest();
            }
            else
            {
                _userDbContext.userModels.Add(userobj);
                _userDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode=200,
                    Message="User Added Successfully!"
                });
            }
        }

        [HttpPost("login")]

        public IActionResult LogIn([FromBody] loginpass loginobj) 
        {
            if(loginobj.UserName == null || loginobj.pswrd==null)
            {
                return BadRequest();
            }
            else 
            {
                var user = _userDbContext.userModels.Where(a =>
                a.UserName ==loginobj.UserName
                && a.pswrd ==loginobj.pswrd).FirstOrDefault();
                if(user != null)
                {
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Logged In Successfully!",
                        UserData = user.FullName

                    });
                }
                else
                {
                    return NotFound(new
                    {
                        StatusCode=404,
                        Message="User Not Found!"
                    });
                }
            }
        }
    }
}
