using System.Net;
using api.Data;
using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProyectorController : ControllerBase
    {
        private readonly DataContext _context;
        public ProyectorController(DataContext context) {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Proyector>>> GetProyectores()
        {
            Thread.Sleep(1200);
            return Ok(await _context.Proyectores.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Proyector>>> GetProyector(int id)
        {
            var dbProy = await _context.Proyectores.FindAsync(id);
            if (dbProy == null)
            {
                return BadRequest(new { tipo = "error", contenido = "Ese proyector no existe." });
            }
            return Ok(dbProy);
        }

        [HttpPost]
        public async Task<ActionResult<List<Proyector>>> CreateProyector(Proyector proyector)
        {

            // El campo serie debe ser unico
            bool serieRepetido = await _context.Proyectores.AnyAsync(p => p.Serie == proyector.Serie);

            if (serieRepetido) {
                return BadRequest(new { tipo = "error",contenido = "Ese número de serie ya existe." });
            }

            _context.Proyectores.Add(proyector);
            await _context.SaveChangesAsync();
            return Ok(await _context.Proyectores.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Proyector>>> UpdateProyector(Proyector proyector)
        {
            var dbProy = await _context.Proyectores.FindAsync(proyector.Id);

            if (dbProy == null) {
                return BadRequest(new { tipo = "error", contenido = "Ese proyector no existe." });
            }

            // El campo serie debe ser unico, se agrega a la condicion que los ids no deben ser iguales
            bool serieRepetido = await _context.Proyectores.AnyAsync(p => p.Serie == proyector.Serie && p.Id != proyector.Id);

            if (serieRepetido)
            {
                //Agregar excepcion si el numero de serie ya existe
                return BadRequest(new { tipo = "error", contenido = "Ese número de serie ya existe." });
            }

            dbProy.Nombre = proyector.Nombre;
            dbProy.Serie = proyector.Serie;
            dbProy.Estatus = proyector.Estatus;

            await _context.SaveChangesAsync();

            return Ok(new { tipo = "success", contenido = "Los cambios se han cambiado de manera exitosa." });

        }
    }
}

