using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarMarket.Entities;


namespace CarMarket.Infrastructure.Services.Abstract
{
    public interface IOfferService
    {
        Offer CreateOffer(
        string username,
        string model,
        int year,
        int mileage,
        string description,
        double price,
        string color,
        string fuel,
        string category,
        int seatsNb,
        int doorsNb ,
        int displacement,
        string gearbox,
        string drive,
        bool damaged,
        bool abs,
        bool airbags,
        bool centrallock,
        bool aircond,
        DateTime starttime,
        DateTime endtime,
        string status,
        string make,
        string photoUri);
        Offer GetOffer(int offerId);

        List<Offer> GetUsersOffers(User user);
    }
}
