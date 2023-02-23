using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Models
{
    public class LocationContext : DbContext
    {
        internal DbSet<Location> Locations;

        public Location[] GetLocations()
        {
            return Locations.ToArray();
        }
    }
}