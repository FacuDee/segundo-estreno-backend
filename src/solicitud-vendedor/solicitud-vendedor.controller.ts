import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { SolicitudVendedorService } from './solicitud-vendedor.service';
import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Controller('solicitud-vendedor')
export class SolicitudVendedorController {
    constructor(private readonly service: SolicitudVendedorService) {}

  // Cualquiera autenticado puede solicitar
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: CreateSolicitudDto) {
    // Valida que userId coincida con token si quieres mayor seguridad
    const solicitud = await this.service.create({ userId: body.userId, username: body.username });
    // aquí puedes notificar al admin (email, socket, etc.)
    return solicitud;
  }

  // Admin: ver todas las solicitudes
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  findAll() {
    return this.service.findAll();
  }

  // Admin: aceptar/rechazar
  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  updateStatus(@Param('id') id: string, @Body() body: { status: 'aceptada' | 'rechazada'}) {
    return this.service.updateStatus(Number(id), body.status);
  }
}
