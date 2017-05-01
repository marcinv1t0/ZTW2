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
        IRoleRepository _roleRepository;
        private readonly IUserRoleRepository _userRoleRepository;


        public UserController(IAuthorizationService authorizationService,
                                IUserRepository userRepository,
                                IRoleRepository roleRepository,
                                ILoggingRepository loggingRepository,
                                IUserService userService, IUserRoleRepository userRoleRepository)
        {
            _authorizationService = authorizationService;
            _userRepository = userRepository;
            _loggingRepository = loggingRepository;
            _userService = userService;
            _roleRepository = roleRepository;
            _userRoleRepository = userRoleRepository;
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



        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {


            Role _role = null;
            String result = "User";

            try
            {


                List<Role> _roles = _userRepository.GetUserRoles(name).ToList();
                foreach (Role role in _roles)
                {
                    if (role.Name == "Admin")
                    {
                        _role = role;
                    }
                }

            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(_role);
        }



    }
}
