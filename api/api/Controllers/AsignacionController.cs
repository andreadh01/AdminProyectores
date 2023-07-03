using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsignacionController : ControllerBase
    {
        private readonly DataContext _context;
        public AsignacionController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Asignacion>>> GetAsignaciones()
        {
            Thread.Sleep(1200);
            var asignaciones = await _context.Asignaciones
            .Include(a => a.Proyector) // Include the related proyector entity
            .ToListAsync();
            return Ok(asignaciones);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Asignacion>>> GetAsignacion(int id)
        {
            var dbAsig = await _context.Asignaciones.Include(a => a.Proyector).FirstOrDefaultAsync(a => a.Id == id);
            if (dbAsig == null)
            {
                return BadRequest(new { tipo = "error", contenido = "Esa asignación no existe." });
            }
            return Ok(dbAsig);
        }


        [HttpGet("details")]
        public async Task<ActionResult<List<Asignacion>>> GetProyectoresDisponibles(DateTime fechaInicio, DateTime fechaFin)
        {
            Thread.Sleep(1200);
            var proyectores = await _context.Proyectores
            // Se checa que el estatus sea true y luego se checa si hay alguna reservacion
            // con ese proyector donde las fechas se empalmen con la nueva reservacion

            // Si la fecha de inicio de la reservacion es antes o igual a la fecha de fin de la asignacion
            // y si la fecha de fin de la reservacion es despues o igual a la fecha de inicio de la asignacion,
            // significa que las fechas se empalman 
            .Where(p => p.Estatus && !_context.Asignaciones.Any(a => a.ProyectorId == p.Id && a.FechaInicio <= fechaFin && a.FechaFin >= fechaInicio))
            .ToListAsync();

            return Ok(proyectores);
        }

        [HttpPost]
        public async Task<ActionResult<List<Asignacion>>> CreateAsignacion(Asignacion asignacion)
        {
            // Se obtiene el proyector indicado en ProyectorID
            var proyector = await _context.Proyectores.FindAsync(asignacion.ProyectorId);

            if (proyector == null)
            {
                // Al asignar, no deberian de poder agregar un proyector
                // Por eso se regresa un bad request
                return BadRequest(new { tipo = "error", contenido = "Ese proyector no existe." });
            }

            // Se agrega el proyector encontrado
            asignacion.Proyector = proyector;

            _context.Asignaciones.Add(asignacion);
            await _context.SaveChangesAsync();
            return Ok(await _context.Asignaciones.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Asignacion>>> UpdateAsignacion(Asignacion asignacion)
        {
            var dbAsig = await _context.Asignaciones.FindAsync(asignacion.Id);

            if (dbAsig == null)
            {
                return BadRequest(new { tipo = "error", contenido = "Esa asignación no existe." });
            }

            var proyector = await _context.Proyectores.FindAsync(asignacion.ProyectorId); // Fetch existing parent from the database

            if (proyector == null)
            {
                // Al asignar, no deberian de poder agregar un proyector
                // Por eso se regresa un bad request
                return BadRequest(new { tipo = "error", contenido = "Ese proyector no existe." });
            }

            dbAsig.Proyector = proyector;
            dbAsig.Nombre = asignacion.Nombre;
            dbAsig.Estatus = asignacion.Estatus;
            dbAsig.FechaInicio = asignacion.FechaInicio;
            dbAsig.FechaFin = asignacion.FechaFin;
            dbAsig.ProyectorId = asignacion.ProyectorId;

            await _context.SaveChangesAsync();
            return Ok(new { tipo = "success", contenido = "Los cambios se han cambiado de manera exitosa." });
        }

    }
}

