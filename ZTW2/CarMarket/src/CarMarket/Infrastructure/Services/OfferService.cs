using CarMarket.Entities;
using CarMarket.Infrastructure.Repositories;
using CarMarket.Infrastructure.Services.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;

namespace CarMarket.Infrastructure.Services
{
    public class OfferService : IOfferService
    {
        private IOfferRepository _offerRepository;
        private IUserRepository _userRepository;

        public OfferService(IOfferRepository offerRepository)
        {
            _offerRepository = offerRepository;
        }

        public Offer GetOffer(int offerId)
        {
            return _offerRepository.GetSingle(offerId);
        }

        public List<Offer> GetUsersOffers(int userId)
        {
            return (List<Offer>)_offerRepository.GetUsersOffers(userId);
        }
        public Offer CreateOffer(int userID, string model, int year, int mileage, string description, double price, string color, string fuel, string category, int seatsNb, int doorsNb, int displacement, string gearbox, string drive, bool damaged, bool abs, bool airbags, bool centrallock, bool aircond, DateTime starttime, DateTime endtime, string status, string make)
        {
            var offer = new Offer()
            {
                UserId = userID,
                Model = model,
                Year = year,
                Mileage = mileage,
                Description = description,
                Price = price,
                Color = color,
                Fuel = fuel,
                Category = category,
                SeatsNb = seatsNb,
                DoorsNb = doorsNb,
                Displacement = displacement,
                Gearbox = gearbox,
                Drive = drive,
                Damaged = damaged,
                ABS = abs,
                Airbags = airbags,
                CentralLock = centrallock,
                AirCond = aircond,
                StartTime = starttime,
                EndTime = endtime,
                Status = status,
                Make = make
                
              
            };


            _offerRepository.Add(offer);
            _offerRepository.Commit();
            return offer;
        }
    }

    
}
