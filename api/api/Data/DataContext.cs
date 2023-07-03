using Microsoft.EntityFrameworkCore;

namespace api.Data
{
	public class DataContext : DbContext
    {
		public DataContext(DbContextOptions<DataContext> options): base(options)
		{
		}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Proyector>()
                .Property(p => p.FechaAgregado)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Asignacion>()
                .Property(a => a.FechaAgregado)
                .HasDefaultValueSql("getdate()");
        }

        public DbSet<Proyector> Proyectores => Set<Proyector>();
        public DbSet<Asignacion> Asignaciones => Set<Asignacion>();
    }
}

