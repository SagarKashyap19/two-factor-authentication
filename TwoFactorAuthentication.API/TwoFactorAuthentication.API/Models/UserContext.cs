using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace TwoFactorAuthentication.API.Models
{
    public class UserContext : DbContext
    {
        public UserContext()
           : base("name=DbConnectionString")
        {
        }
        public DbSet<User> users { get; set; }
    }
}