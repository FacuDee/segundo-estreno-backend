import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrendaService } from './prenda.service';
import { Prenda } from './prenda.entity';
import { CreatePrendaDto } from './dto/create-prenda.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('prenda')
export class PrendaController {
  constructor(private readonly prendaService: PrendaService) {}

  // Obtener todas las prendas
  @Get()
  async findAll(): Promise<Prenda[]> {
    try {
      return await this.prendaService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error recuperando todas las prendas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Endpoint para admin: obtener todas las prendas con detalles del vendedor
  @Get('admin/todas')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async findAllWithVendedor(): Promise<Prenda[]> {
    try {
      return await this.prendaService.findAllWithVendedor();
    } catch (error) {
      throw new HttpException(
        'Error recuperando todas las prendas para admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Método para obtener prendas por usuario (vendedor)
  @Get('usuario/:userId')
  @UseGuards(AuthGuard('jwt'))
  async findByUser(@Param('userId') userId: string): Promise<Prenda[]> {
    try {
      const userIdNumber = parseInt(userId, 10);
      const prendas = await this.prendaService.findByUser(userIdNumber);
      return prendas;
    } catch (error) {
      throw new HttpException(
        'Error recuperando prendas del usuario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // obtener una prenda por id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Prenda | null> {
    try {
      return await this.prendaService.findOne(id);
    } catch (error) {
      throw new HttpException('Prenda no encontrada', HttpStatus.NOT_FOUND);
    }
  }

  //crear una prenda
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createPrendaDto: CreatePrendaDto, @Request() req) {
    // Agregar el vendedor_id del usuario autenticado
    const prendaData = {
      ...createPrendaDto,
      vendedor_id: req.user.id
    };
    return this.prendaService.create(prendaData);
  }

  // Actualizar una prenda
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() updatePrendaDto: CreatePrendaDto,
    @Request() req,
  ) {
    // Verificar que la prenda pertenezca al usuario
    const prenda = await this.prendaService.findOne(+id);
    if (!prenda || prenda.vendedor?.id !== req.user.id) {
      throw new HttpException('Prenda no encontrada o acceso denegado', HttpStatus.FORBIDDEN);
    }
    return this.prendaService.update(id, updatePrendaDto);
  }

  // Endpoint para admin: actualizar cualquier prenda
  @Put('admin/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async adminUpdate(
    @Param('id') id: string,
    @Body() updatePrendaDto: CreatePrendaDto,
  ) {
    try {
      // Admin puede actualizar cualquier prenda sin verificar propiedad
      return await this.prendaService.adminUpdate(id, updatePrendaDto);
    } catch (error) {
      throw new HttpException('Error actualizando prenda', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Endpoint para admin: eliminar cualquier prenda
  @Delete('admin/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  async adminRemove(@Param('id') id: string) {
    try {
      return await this.prendaService.remove(id);
    } catch (error) {
      throw new HttpException('Error eliminando prenda', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Borrar una prenda
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req) {
    // Verificar que la prenda pertenezca al usuario
    const prenda = await this.prendaService.findOne(+id);
    if (!prenda || prenda.vendedor?.id !== req.user.id) {
      throw new HttpException('Prenda no encontrada o acceso denegado', HttpStatus.FORBIDDEN);
    }
    return this.prendaService.remove(id);
  }
}
