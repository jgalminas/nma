using API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using static API.Controllers.DrawingController;

namespace API.Models
{
    public class DrawingContext : DbContext
    {
        internal DbSet<Drawing> Drawings;

        public CreateResult CreateDrawing(Drawing drawing)
        {
            if (Drawings.Find(drawing.ID) != null) return CreateResult.AlreadyExists;
            Drawings.Add(drawing);
            SaveChanges();
            return CreateResult.Ok;
        }

        public UpdateDeleteResult UpdateDrawing(int id, NewDrawing drawing)
        {
            return UpdateDeleteResult.Ok;
        }

        public UpdateDeleteResult DeleteDrawing(int id)
        {
            return UpdateDeleteResult.Ok;
        }
    }
}