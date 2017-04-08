using CarMarket.Entities;
using System.Collections.Generic;

namespace CarMarket.Infrastructure.Repositories
{
    public interface IAlbumRepository : IEntityBaseRepository<Album> { }

    public interface ILoggingRepository : IEntityBaseRepository<Error> { }

    public interface IPhotoRepository : IEntityBaseRepository<Photo> { }

    public interface IRoleRepository : IEntityBaseRepository<Role> { }

    public interface IUserRepository : IEntityBaseRepository<User>
    {
        User GetSingleByUsername(string username);
        IEnumerable<Role> GetUserRoles(string username);
    }

    public interface IUserRoleRepository : IEntityBaseRepository<UserRole> { }

    public interface IOfferRepository : IEntityBaseRepository<Offer> {
        IEnumerable<Offer> GetUsersOffers(User user);
    }
}
