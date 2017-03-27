using CarMarket.Entities;

namespace CarMarket.Infrastructure.Repositories
{
    public class RoleRepository : EntityBaseRepository<Role>, IRoleRepository
    {
        public RoleRepository(CarMarketContext context)
            : base(context)
        { }
    }
}
