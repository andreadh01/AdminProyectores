using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.Hosting;

namespace api
{
	public class Proyector
	{
        // automaticamente se toma id como identity
        public int Id { get; set; }

        public required DateTime FechaAgregado { get; set; }

        public required string Nombre { get; set; }

        public required string Serie { get; set; }

        public required bool Estatus { get; set; }


    }
}

