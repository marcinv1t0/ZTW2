using CarMarket.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;

namespace CarMarket.Infrastructure
{
    public static class DbInitializer
    {
        private static CarMarketContext context;
        public static void Initialize(IServiceProvider serviceProvider, string imagesPath)
        {
            context = (CarMarketContext)serviceProvider.GetService(typeof(CarMarketContext));

           
            InitializeUserRoles();

        }

        

        private static void InitializeUserRoles()
        {
            if (!context.Roles.Any())
            {
                // create roles
                context.Roles.AddRange(new Role[]
                {
                new Role()
                {
                    Name="Admin"
                }
                });

                context.SaveChanges();
            }

            
        }
    }
}
