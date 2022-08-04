using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class CitasController : BaseApiController
  {
    private readonly DataContext _context;
    public CitasController(DataContext context)
    {
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Cita>>> GetCitas()
    {
        return await _context.Citas.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cita>> GetCita(Guid id)
    {
        return await _context.Citas.FindAsync(id);
    }
  }
}