using AutoMapper;
using CarMarket.Entities;
using CarMarket.ViewModels;
using System.Linq;

namespace CarMarket.Infrastructure.Mappings
{
    public class DomainToViewModelMappingProfile : Profile
    {
        protected override void Configure()
        {
            Mapper.CreateMap<Offer, OfferViewModel>()
                .ForMember(vm => vm.PhotoUri, map => map.MapFrom(p => "/images/" + p.PhotoUri));
            
        }
    }
}
