using System;

namespace Domain
{
    public class Cita
    {
        public Guid Id { get; set; }
        public DateTime FechaHoraInicio { get; set; }
        public DateTime FechaHoraFin { get; set; }
        public int Cliente { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public string Tratamientos { get; set; }
        public string Nota { get; set; }
    }
}