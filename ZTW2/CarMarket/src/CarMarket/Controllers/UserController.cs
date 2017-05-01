using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CarMarket.Entities;
using CarMarket.ViewModels;
using AutoMapper;
using CarMarket.Infrastructure.Repositories;
using CarMarket.Infrastructure.Core;
using Microsoft.AspNetCore.Authorization;
using CarMarket.Infrastructure.Services;
using CarMarket.Infrastructure.Services.Abstract;


namespace CarMarket.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        IUserRepository _userRepository;
        ILoggingRepository _loggingRepository;
        IUserService _userService;



        public UserController(IAuthorizationService authorizationService,
                                IUserRepository userRepository,
                                ILoggingRepository loggingRepository,
                                IUserService userService)
        {
            _authorizationService = authorizationService;
            _userRepository = userRepository;
            _loggingRepository = loggingRepository;
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
            List<User> _users = null;

            try
            {
                

                int _totalUsers = new int();


                

                _users = _userRepository.GetAll().ToList();

                _totalUsers = _userRepository.GetAll().Count();

                IEnumerable<UserViewModel> _usersVM = Mapper.Map<IEnumerable<User>, IEnumerable<UserViewModel>>(_users);

                
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(_users);
        }

        

        

        
    }
}
