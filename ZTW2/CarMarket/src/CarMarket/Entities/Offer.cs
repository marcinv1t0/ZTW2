using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMarket.Entities
{
    public class Offer
    {
        public int OfferId { get; set; }

        public int? UserId { get; set; }
        public User User { get; set; }

        public string Model { get; set; }
        public int Year { get; set; }
        public int Mileage { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public string Fuel { get; set; }
        public string Category { get; set; }
        public int SeatsNb { get; set; }
        public int DoorsNb { get; set; }
        public int Displacement { get; set; }
        public string Gearbox { get; set; }
        public string Drive { get; set; }
        public bool Damaged { get; set; }
        public bool ABS { get; set; }
        public bool Airbags { get; set; }
        public bool CentralLock { get; set; }
        public bool AirCond { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Status { get; set; }

        public Album Album { get; set;  }
        public int AlbumID { get; set; }

    }
}
