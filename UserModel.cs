using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Models
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
       
        public string UserName { get; set; }
   
        public string pswrd { get; set; }
        public string Mobile { get; set; }
        public string UserType { get; set; }



    }
}
