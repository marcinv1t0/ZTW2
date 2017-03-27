using CarMarket.Entities;

namespace CarMarket.Infrastructure.Repositories
{
    public class AlbumRepository : EntityBaseRepository<Album>, IAlbumRepository
    {
        public AlbumRepository(CarMarketContext context)
            : base(context)
        { }
    }
}
