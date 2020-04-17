using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TwoFactorAuthentication.API.Models
{
    [Table("Users")]
    public class User
    { 
        [Key]
        public string Email { get; set; } 
        public string Password { get; set; }
        public int OTP { get; set; }
    }
}