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

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CarMarket.Controllers
{
    [Route("api/[controller]")]
    public class OfferController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        IOfferRepository _offerRepository;
        ILoggingRepository _loggingRepository;
        IOfferService _offerService;
        
        public OfferController(IAuthorizationService authorizationService,
                                IOfferRepository offerRepository,
                                ILoggingRepository loggingRepository,
                                IOfferService offerService)
        {
            _authorizationService = authorizationService;
            _offerRepository = offerRepository;
            _loggingRepository = loggingRepository;
            _offerService = offerService;
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpGet("{page:int=0}/{pageSize=12}")]
        public async Task<IActionResult> Get(int? page, int? pageSize)
        {
            PaginationSet<OfferViewModel> pagedSet = new PaginationSet<OfferViewModel>();

            try
            {
                if (await _authorizationService.AuthorizeAsync(User, "AdminOnly"))
                {
                    int currentPage = page.Value;
                    int currentPageSize = pageSize.Value;

                    List<Offer> _offers = null;
                    int _totalOffers = new int();


                    _offers = _offerRepository
                        .AllIncluding(a => a.UserId)
                        .OrderBy(a => a.Id)
                        .Skip(currentPage * currentPageSize)
                        .Take(currentPageSize)
                        .ToList();

                    _totalOffers = _offerRepository.GetAll().Count();

                    IEnumerable<OfferViewModel> _offersVM = Mapper.Map<IEnumerable<Offer>, IEnumerable<OfferViewModel>>(_offers);

                    pagedSet = new PaginationSet<OfferViewModel>()
                    {
                        Page = currentPage,
                        TotalCount = _totalOffers,
                        TotalPages = (int)Math.Ceiling((decimal)_totalOffers / currentPageSize),
                        Items = _offersVM
                    };
                }
                else
                {
                    CodeResultStatus _codeResult = new CodeResultStatus(401);
                    return new ObjectResult(_codeResult);
                }
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(pagedSet);
        }

        [Route("putoffer")]
        [HttpPost]

        public IActionResult PutOffer([FromBody] OfferViewModel offer)
        {
            IActionResult _result = new ObjectResult(false);
            GenericResult _offerResult = null;

            try
            {
                Offer _offer = _offerService.CreateOffer(offer.UserId, offer.Model, offer.Year, offer.Mileage, offer.Description, offer.Price, offer.Color, offer.Fuel,
                    offer.Category, offer.SeatsNb, offer.DoorsNb, offer.Displacement, offer.Gearbox, offer.Drive, offer.Damaged, offer.ABS, offer.Airbags, offer.CentralLock, offer.AirCond,
                    offer.StartTime, offer.EndTime, offer.Status, offer.Make);

                if(_offer != null)
                {
                    _offerResult = new GenericResult()
                    {
                        Succeeded = true,
                        Message = "Oferta dodana pomyślnie"
                    };
                }
            }
            catch (Exception ex)
            {
                _offerResult = new GenericResult()
                {
                    Succeeded = false,
                    Message = ex.Message
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            _result = new ObjectResult(_offerResult);
            return _result;
        }


     
    }
}
