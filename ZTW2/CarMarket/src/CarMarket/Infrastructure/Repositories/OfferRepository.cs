using CarMarket.Entities;
using System.Collections.Generic;

namespace CarMarket.Infrastructure.Repositories
{
    public class OfferRepository : EntityBaseRepository<Offer>, IOfferRepository
    {
        public OfferRepository(CarMarketContext context)
            : base(context)
        { }

        public IEnumerable<Offer> GetUsersOffers(User user)
        {
            List<Offer> _offers = null;
            List<Offer> _allOffers = (List<Offer>) this.GetAll();
            foreach(var _offer in _allOffers)
            {
                if (_offer.User == user) _offers.Add(_offer);
            }
            return _offers;
        }

        public Offer GetOfferById(int id)
        {
            Offer _offer = null;
            List<Offer> _allOffers = (List<Offer>)this.GetAll();
            foreach (var _off in _allOffers)
            {
                if (_off.Id == id) { _offer = _off; }                
            }
            return _offer;
        }
    }
}