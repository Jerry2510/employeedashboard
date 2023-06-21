using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class EmployeeModel
    {
        [Key]
        public int empid { get; set; }
        
        public string fname { get; set; }
        public string lname { get; set; }

        public string  salary { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }

    }
}
