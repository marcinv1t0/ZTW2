using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMarket.Entities
{

        public class View
        {
            public int ViewId { get; set; }
            public int? OfferId { get; set; }
            public Offer Offer { get; set; }
            public string IP { get; set; }
            public DateTime Time { get; set; }
        }
}
