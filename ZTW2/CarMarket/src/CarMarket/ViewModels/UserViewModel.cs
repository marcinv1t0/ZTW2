using CarMarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMarket.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Salt { get; set; }
        public bool IsLocked { get; set; }
        public DateTime DateCreated { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

    }
}

