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

            InitializePhotoAlbums(imagesPath);
            InitializeUserRoles();

        }

        private static void InitializePhotoAlbums(string imagesPath)
        {
            if (!context.Albums.Any())
            {
                List<Album> _albums = new List<Album>();

                var _album1 = context.Albums.Add(
                    new Album
                    {
                        DateCreated = DateTime.Now,
                        Title = "Album 1",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }).Entity;
                var _album2 = context.Albums.Add(
                    new Album
                    {
                        DateCreated = DateTime.Now,
                        Title = "Album 2",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }).Entity;
                var _album3 = context.Albums.Add(
                    new Album
                    {
                        DateCreated = DateTime.Now,
                        Title = "Album 3",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }).Entity;
                var _album4 = context.Albums.Add(
                    new Album
                    {
                        DateCreated = DateTime.Now,
                        Title = "Album 4",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    }).Entity;

                _albums.Add(_album1); _albums.Add(_album2); _albums.Add(_album3); _albums.Add(_album4);

                string[] _images = Directory.GetFiles(Path.Combine(imagesPath, "images"));
                Random rnd = new Random();

                foreach (string _image in _images)
                {
                    int _selectedAlbum = rnd.Next(1, 4);
                    string _fileName = Path.GetFileName(_image);

                    context.Photos.Add(
                        new Photo()
                        {
                            Title = _fileName,
                            DateUploaded = DateTime.Now,
                            Uri = _fileName,
                            Album = _albums.ElementAt(_selectedAlbum)
                        }
                        );
                }

                context.SaveChanges();
            }
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
