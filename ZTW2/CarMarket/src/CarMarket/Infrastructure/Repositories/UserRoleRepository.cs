using CarMarket.Entities;

namespace CarMarket.Infrastructure.Repositories
{
    public class UserRoleRepository : EntityBaseRepository<UserRole>, IUserRoleRepository
    {
        public UserRoleRepository(CarMarketContext context)
            : base(context)
        { }
    }
}
