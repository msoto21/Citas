using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Citas.Any()) return;
            
            var citas = new List<Cita>
            {
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(-2),
                    FechaHoraFin = DateTime.Now.AddMonths(-2),
                    Cliente = 1,
                    Titulo = "Primera cita",
                    Descripcion = "Descripción de la Primera Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(-1),
                    FechaHoraFin = DateTime.Now.AddMonths(-1),
                    Cliente = 5,
                    Titulo = "Segunda cita",
                    Descripcion = "Descripción de la Segunda Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(1),
                    FechaHoraFin = DateTime.Now.AddMonths(1),
                    Cliente = 3,
                    Titulo = "Tercera cita",
                    Descripcion = "Descripción de la Tercera Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(2),
                    FechaHoraFin = DateTime.Now.AddMonths(2),
                    Cliente = 4,
                    Titulo = "Cuarta cita",
                    Descripcion = "Descripción de la Cuarta Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(3),
                    FechaHoraFin = DateTime.Now.AddMonths(3),
                    Cliente = 1,
                    Titulo = "Quinta cita",
                    Descripcion = "Descripción de la Primera Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(4),
                    FechaHoraFin = DateTime.Now.AddMonths(4),
                    Cliente = 8,
                    Titulo = "Sexta cita",
                    Descripcion = "Descripción de la Sexta Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(5),
                    FechaHoraFin = DateTime.Now.AddMonths(5),
                    Cliente = 6,
                    Titulo = "Sétima cita",
                    Descripcion = "Descripción de la Sétima Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(6),
                    FechaHoraFin = DateTime.Now.AddMonths(6),
                    Cliente = 9,
                    Titulo = "Octava cita",
                    Descripcion = "Descripción de la Octava Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(7),
                    FechaHoraFin = DateTime.Now.AddMonths(7),
                    Cliente = 10,
                    Titulo = "Novena cita",
                    Descripcion = "Descripción de la Novena Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                },
                new Cita
                {
                    FechaHoraInicio = DateTime.Now.AddMonths(8),
                    FechaHoraFin = DateTime.Now.AddMonths(8),
                    Cliente = 1,
                    Titulo = "Décima cita",
                    Descripcion = "Descripción de la Décima Cita",
                    Tratamientos = "Varios",
                    Nota = "Aquí anota"
                }
            };

            await context.Citas.AddRangeAsync(citas);
            await context.SaveChangesAsync();
        }
    }
}