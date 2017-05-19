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
        IOfferRepository _offerRepository;
        IUserService _userService;
        IRoleRepository _roleRepository;
        private readonly IUserRoleRepository _userRoleRepository;


        public UserController(IAuthorizationService authorizationService,
                                IUserRepository userRepository,
                                IRoleRepository roleRepository,
                                IOfferRepository offerRepository,
                                ILoggingRepository loggingRepository,
                                IUserService userService, IUserRoleRepository userRoleRepository)
        {
            _authorizationService = authorizationService;
            _userRepository = userRepository;
            _offerRepository = offerRepository;
            _loggingRepository = loggingRepository;
            _userService = userService;
            _roleRepository = roleRepository;
            _userRoleRepository = userRoleRepository;
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            IActionResult _result = new ObjectResult(false);
            GenericResult _removeResult = null;

            try
            {
                Offer _offerToRemove = this._offerRepository.GetSingle(id);
                this._offerRepository.Delete(_offerToRemove);
                this._offerRepository.Commit();

                _removeResult = new GenericResult()
                {
                    Succeeded = true,
                    Message = "Offer removed."
                };
            }
            catch (Exception ex)
            {
                _removeResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            _result = new ObjectResult(_removeResult);
            return _result;
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


            Role _role = new Entities.Role();
            _role.Id = 0;
            _role.Name = "User";
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
