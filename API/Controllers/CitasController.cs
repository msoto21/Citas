using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Citas;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
  public class CitasController : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<List<Cita>>> GetCitas()
    {
      return await Mediator.Send(new List.Query());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Cita>> GetCita(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }

    [HttpPost]
    public async Task<IActionResult> CreateCita(Cita cita)
    {
      return Ok(await Mediator.Send(new Create.Command { Cita = cita }));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> EditCita(Guid id, Cita cita)
    {
      cita.Id = id;
      return Ok(await Mediator.Send(new Edit.Command { Cita = cita }));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCita(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command{Id = id}));
    }
  }
}