using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMarket.ViewModels
{
    public class OfferViewModel
    {
       //public int Id { get; set; }
        public string Username { get; set; }
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
        public string Make { get; set; }
        public string PhotoUri { get; set; }
    }
}
