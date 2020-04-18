using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using TwoFactorAuthentication.API.Models;
using TwoFactorAuthentication.API.Validator;

namespace TwoFactorAuthentication.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        UserContext UserContext;
        static string emailId = "indiainnowave@gmail.com";
        static string password = "smtpInw.1@";
        
        public LoginController()
        {
            UserContext = new UserContext();
        }

        [HttpPost]
        public IHttpActionResult PostUser(User user)
        {
            bool userAdded = Populate(user.Email, user.Password);
            if(userAdded)
            {
                return Ok();
            }
            return BadRequest("User is already Registered");
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
                    int otp = StoreOTP(user);
                    if(otp != 0)
                    {
                        return Ok("preshared Key");
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

            }
            return NotFound();
        }

        public bool Populate(string email, string password)
        {
            int otp = GenerateOTP();
            bool getUser = FindUser(email, password);
            string presharedKey = TimeSensitivePassCode.GeneratePresharedKey();
            if (getUser == false)
            {
                UserContext.users.Add(new User { Email = email, Password = password, OTP = otp });
                UserContext.SaveChanges();
                return true;
            }
            return false;
        }
        private int GenerateOTP()
        {
            string presharedKey = TimeSensitivePassCode.GeneratePresharedKey();
            IList<string> otps = TimeSensitivePassCode.GetListOfOTPs(presharedKey);
            return Convert.ToInt32(otps[1]);
        }
        private bool ValidateOTP(string email, int otp)
        {
            User getuser = UserContext.users.Where(x => x.Email == email).Where(x=> x.OTP == otp).FirstOrDefault();

            if (getuser != null)
            {
                return true;
            }
            return false;
        }

        private int StoreOTP(User user)
        {
            User getuser = UserContext.users.Where(x => x.Email == user.Email).FirstOrDefault();
            //Random rnd = new Random();
            int otp = GenerateOTP();
            //SMTP google mail
            bool mailSent = SendEmail(user.Email,otp);
            getuser.OTP = otp;
            if (getuser != null)
            {
                UserContext.Entry(getuser).CurrentValues.SetValues(getuser);
                UserContext.SaveChanges();
            }
            return otp;
        }

        private bool SendEmail(string email, int otp)
        {
            bool f = false;
            string subject = "Verification OTP";
            string body = "your otp from abc.com is : " + otp;
            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                smtpClient.EnableSsl = true;
                smtpClient.Credentials = new NetworkCredential(emailId,password);
                smtpClient.Send(emailId, email, subject, body);
                f = true;
            }
            catch (Exception ex)
            {
                f = false;
            }
            return f;
        }

        private bool FindUser(string email, string password)
        {
            User user =
              UserContext.users.Where(x =>  x.Email == email).Where(x=>x.Password == password).FirstOrDefault();

            if (user != null)
            {
                 return true;
            }
            return false;
        }
    }
}
