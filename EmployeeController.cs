using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserDbContext _userDbContext;
        public EmployeeController(UserDbContext userDbContext) 
        { 
           _userDbContext = userDbContext;
        }

        [HttpPost("add_employee")]
        public IActionResult AddEmployee([FromBody] EmployeeModel employeeobj)
        {
            if(employeeobj == null)
            {
                return BadRequest();
            }
            else
            {
                employeeobj.empid = 0;
                _userDbContext.employeeModels.Add(employeeobj);
                _userDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Added Successfully!"
                });
            }
        }
        [HttpGet("get_employees")]

        public IActionResult GetEmployees()
        {
            var userdetails = _userDbContext.employeeModels.AsQueryable();
            return Ok(userdetails);
        }
        [HttpGet("get_employeeby/{id}")]
        public IActionResult GetEmployee(int id) 
        {
            var user = _userDbContext.employeeModels.Find(id);
            if(user==null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User not found"
                });
            }
            else 
            { 
                return Ok(new
                {
                    StatusCode= 200,
                    EmployeeDetail=user
                }); 
            }
        }
        [HttpDelete("delete_employee/{id}")]

        public IActionResult DeleteEmployee(int id) 
        {
            var user = _userDbContext.employeeModels.Find(id);
            if(user==null) 
            {
                return NotFound(new
                {
                    StatusCode=404,
                    Message="User not found"
                });
            }
            else
            {
                _userDbContext.Remove(user);
                _userDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "EmployeeAPI deleted"
                });
            }
        }
        [HttpPut("Update_employee")]

        public IActionResult UpdateEmployee([FromBody] EmployeeModel employeeobj)
        {
            if(employeeobj==null)
            {
                return BadRequest();
            }
            var user = _userDbContext.employeeModels.AsNoTracking().FirstOrDefault(
                x => x.empid == employeeobj.empid) ;
            if(user==null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User not found"
                });
            }
            else
            {
                _userDbContext.Entry(employeeobj).State = EntityState.Modified;
                _userDbContext.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee Updated Successfully!"
                });
            }
        }

    }
}
