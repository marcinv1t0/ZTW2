using CarMarket.Entities;
using CarMarket.Infrastructure.Repositories;
using CarMarket.Infrastructure.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace CarMarket.Infrastructure.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public User GetUser(int userId)
        {
            return _userRepository.GetSingle(userId);
        }

       
        public User CreateUser(string username, string email)
        {
            var user = new User()
            {
                Username = username,
                Email = email

            };


            _userRepository.Add(user);
            _userRepository.Commit();
            return user;
        }

        

       
    }


}
