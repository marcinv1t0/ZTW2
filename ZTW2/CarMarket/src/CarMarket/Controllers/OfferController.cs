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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // PaginationSet<OfferViewModel> pagedSet = new PaginationSet<OfferViewModel>();
            List<Offer> _offers = null;

            try
            {
                //if (await _authorizationService.AuthorizeAsync(User, "AdminOnly"))
                //{
                //int currentPage = page.Value;
                //int currentPageSize = pageSize.Value;

                int _totalOffers = new int();


                /*_offers = _offerRepository
                    .OrderBy(a => a.StartTime)
                    //.Skip(currentPage * currentPageSize)
                    //Take(currentPageSize)
                    .ToList();*/

                _offers = _offerRepository.GetAll().ToList();

                _totalOffers = _offerRepository.GetAll().Count();

                IEnumerable<OfferViewModel> _offersVM = Mapper.Map<IEnumerable<Offer>, IEnumerable<OfferViewModel>>(_offers);

                /* pagedSet = new PaginationSet<OfferViewModel>()
                 {
                     Page = currentPage,
                     TotalCount = _totalOffers,
                     TotalPages = (int)Math.Ceiling((decimal)_totalOffers / currentPageSize),
                     Items = _offersVM
                 };*/
                //}
                /*   else
                   {
                       CodeResultStatus _codeResult = new CodeResultStatus(401);
                       return new ObjectResult(_codeResult);
                   } */
            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(_offers);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {

            List<Offer> _offers = null;
            Offer result = null;

            try
            {


                int _totalOffers = new int();





                _offers = _offerRepository.GetAll().ToList();
                result = this._offerRepository.GetSingle(a => a.Id == id);
                _totalOffers = _offerRepository.GetAll().Count();

                IEnumerable<OfferViewModel> _offersVM = Mapper.Map<IEnumerable<Offer>, IEnumerable<OfferViewModel>>(_offers);
                OfferViewModel _offerVM = Mapper.Map<Offer, OfferViewModel>(result);

            }
            catch (Exception ex)
            {
                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            return new ObjectResult(result);
        }

        // [Route("offer")]
        [HttpPost]
        public IActionResult Post([FromBody] OfferViewModel offer)
        {
            IActionResult _result = new ObjectResult(false);
            GenericResult _offerResult = null;

            try
            {

                Offer _offer = _offerService.CreateOffer(offer.Username, offer.Model, offer.Year, offer.Mileage, offer.Description, offer.Price, offer.Color, offer.Fuel,
                    offer.Category, offer.SeatsNb, offer.DoorsNb, offer.Displacement, offer.Gearbox, offer.Drive, offer.Damaged, offer.ABS, offer.Airbags, offer.CentralLock, offer.AirCond,
                    offer.StartTime, offer.EndTime, offer.Status, offer.Make, offer.PhotoUri);

                if (_offer != null)
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
                    Message = "Należy wypełnić wszystkie pola"
                };

                _loggingRepository.Add(new Error() { Message = ex.Message, StackTrace = ex.StackTrace, DateCreated = DateTime.Now });
                _loggingRepository.Commit();
            }

            _result = new ObjectResult(_offerResult);
            return _result;
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



    }
}
