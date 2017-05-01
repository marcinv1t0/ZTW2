using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarMarket.Entities;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CarMarket.Infrastructure.Services.Abstract
{
    public interface IUserService
    {
        User CreateUser(
        string username,
        string email);
        User GetUser(int userId);

        
    }
}
