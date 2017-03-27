using System;
using System.Collections.Generic;

namespace CarMarket.Entities
{
    public class Album : IEntityBase
    {
        public Album()
        {
            Photos = new List<Photo>();
        }
        public int Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
        public int MainPhotoID { get; set;  }
    }
}
