import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioService } from './usuario.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('test-db')
  async testDb(): Promise<string> {
    try {
      await this.usuarioService.findAll();
      return 'Conexión exitosa con la base de datos';
    } catch (error) {
      return 'Error de conexión: ' + error.message;
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async getAll() {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getById(@Param('id') id: number) {
    return await this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() usuarioData: any) {
    return await this.usuarioService.create(usuarioData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: number, @Body() usuarioData: any) {
    return await this.usuarioService.update(id, usuarioData);
  }

  @Put(':id/perfil')
  @UseGuards(AuthGuard('jwt'))
  async updatePerfil(@Param('id') id: number, @Body() usuarioData: any) {
    // Solo permite actualizar username y email (no rol ni password)
    const allowedFields = {
      ...(usuarioData.username && { username: usuarioData.username }),
      ...(usuarioData.email && { email: usuarioData.email })
    };
    return await this.usuarioService.update(id, allowedFields);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: number) {
    return await this.usuarioService.remove(id);
  }
}