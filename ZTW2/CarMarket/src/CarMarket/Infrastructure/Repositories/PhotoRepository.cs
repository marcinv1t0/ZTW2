using CarMarket.Entities;

namespace CarMarket.Infrastructure.Repositories
{
    public class PhotoRepository : EntityBaseRepository<Photo>, IPhotoRepository
    {
        public PhotoRepository(CarMarketContext context)
            : base(context)
        { }
    }
}
