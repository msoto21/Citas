using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Citas
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Cita Cita { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      private readonly IMapper _mapper;
      public Handler(DataContext context, IMapper mapper)
      {
        _mapper = mapper;
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var cita = await _context.Citas.FindAsync(request.Cita.Id);

        _mapper.Map(request.Cita, cita);

        await _context.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}