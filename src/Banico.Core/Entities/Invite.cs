using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class Invite
    {
        [Key]
        public int Id { get; set; }
        public string Inviter { get; set; }
        public string Email { get; set; }
        public string Code { get; set; }
    }
}