using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using TwoFactorAuthentication.API.Models;

namespace TwoFactorAuthentication.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        UserContext UserContext;
        public LoginController()
        {
            UserContext = new UserContext();
        }

        public void Populate(string email, string password)
        {
            UserContext.users.Add(new User { Email = email, Password = password, OTP = 1234 });
            UserContext.SaveChanges();
        }

        [HttpPost]
        public IHttpActionResult GetUser(User user)
        {
            //Populate(user.Email,user.Password);
            if (user.OTP == 0)
            {
                bool found = FindUser(user.Email, user.Password);
                if (found)
                {
                    int otp = CreateOTP(user);
                    if(otp != 0)
                    {
                        return Ok();
                    }

                    else
                    {
                        return Unauthorized();
                    }
                }
            }

            else
            {
                bool found = FindUser(user.Email, user.Password);
                if (found)
                {
                    bool validOTP = ValidateOTP(user.Email, user.OTP);
                    if(validOTP)
                    {
                        return Ok();
                    }
                }

                if (user.Email == "abc@abc.com" && user.Password == "1234567" && user.OTP != 123456)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        private bool ValidateOTP(string email, int otp)
        {
            User getuser = UserContext.users.Where(x => x.Email == email).Where(x=> x.OTP == otp).FirstOrDefault();

            if(getuser != null)
            {
                return true;
            }
            return false;
        }

        private int CreateOTP(User user)
        {
            User getuser = UserContext.users.Where(x => x.Email == user.Email).FirstOrDefault();
            Random rnd = new Random();
            int otp = rnd.Next(1000, 9999);
            //SMTP google mail
            getuser.OTP = otp;
            if (getuser != null)
            {
                UserContext.Entry(getuser).CurrentValues.SetValues(getuser);
                UserContext.SaveChanges();
            }
            return otp;
        }

        private bool FindUser(string email, string password)
        {
            User user =
              UserContext.users.Where(x =>  x.Email == email).Where(x=>x.Password == password).FirstOrDefault();

            if (user.Email == email && user.Password == password)
            {
                 return true;
            }
            return false;
        }
    }
}
