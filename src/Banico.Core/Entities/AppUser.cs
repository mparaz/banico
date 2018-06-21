using Microsoft.AspNetCore.Identity;

namespace Banico.Core.Entities
{
    // Add profile data for application users by adding properties to this class
  public class AppUser : IdentityUser<string>
  {
    // Extended Properties
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Alias { get; set; }
    public string Inviter { get; set; }
    public long? FacebookId { get; set; }
    public string PictureUrl { get; set; }
  }
}