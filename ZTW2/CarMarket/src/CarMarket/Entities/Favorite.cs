﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMarket.Entities
{
    public class Favorite : IEntityBase
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? OfferId { get; set; }
        public Offer Offer { get; set; }
    }
}
