using System;
using System.Collections.Generic;
using System.Linq;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace Banico.Services.Interfaces
{
    public interface IEmailSender
    {
        SendGridMessage Message { get; set; }
        Task<Response> SendEmailAsync(string email, string subject, string message);
        Task<Response> SendEmailAsync(string name, string email, string subject, string message);
    }
}
