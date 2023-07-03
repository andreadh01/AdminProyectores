using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api
{
	public class Asignacion
	{
        // automaticamente se toma id como identity
        public int Id { get; set; }

        public required DateTime FechaAgregado { get; set; }

        public required string Nombre { get; set; }

        public required DateTime FechaInicio { get; set; }

        public required DateTime FechaFin { get; set; }

        public required bool Estatus { get; set; }

        // Llave foranea
        public required int ProyectorId { get; set; }
        public Proyector Proyector { get; set; } = null!;



    }
}

