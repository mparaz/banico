using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Banico.Services.Interfaces;

namespace Banico.Services
{
    public class InviteService : IInviteService
    {
        private readonly IInviteRepository _inviteRepository;
        private readonly IEmailSender _emailSender;
        
        public InviteService (
            IInviteRepository inviteRepository,
            IEmailSender emailSender)
        {
            _inviteRepository = inviteRepository;
            _emailSender = emailSender;
        }

        public async Task<int> Add(string url, string inviter, string emails)
        {
            string[] emailArray = emails.Split(new string[] {"\n", "\r\n", ",", ";", " "}, StringSplitOptions.RemoveEmptyEntries);
            int result = 0;

            foreach (string email in emailArray)
            {
                string code = CreateRandomCode(6);

                Invite invite = new Invite();
                invite.Inviter = inviter;
                invite.Email = email;
                invite.Code = code;

                result += await _inviteRepository.Add(invite);
                await SendEmail(email, url, code);
            }

            return result;
        }

        public string CreateRandomCode(int codeCount)
        {
            string allChar = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
            string[] allCharArray = allChar.Split(',');
            string randomCode = "";
            int temp = -1;

            Random rand = new Random();
            for (int i = 0; i < codeCount; i++)
            {
                if (temp != -1)
                {
                    rand = new Random(i * temp * ((int)DateTime.Now.Ticks));
                }

                int t = rand.Next(36);
                if (temp != -1 && temp == t)
                {
                    return CreateRandomCode(codeCount);
                }

                temp = t;
                randomCode += allCharArray[t];
            }

            return randomCode;
        }

        public async Task<bool> SendEmail(string email, string url, string code)
        {
            url = url + "?email=" + email + "&code=" + code;
            await _emailSender.SendEmailAsync(email, "Invitation",
                $"You have been invited. Please register by clicking this link: <a href='{url}'>link</a>");

            return true;
        }

        public async Task<string> IsInvited(string email, string code)
        {
            return await _inviteRepository.IsInvited(email, code);
        }
    }
}