import { Body, Controller, Post, Req, UseGuards, Get, Param } from '@nestjs/common';
import { TransaccionService } from './transaccion.service';
import { CreateTransaccionDto } from './dto/create-transaccion.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaccion')
export class TransaccionController {


	constructor(private readonly transaccionService: TransaccionService) {}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	async create(@Body() dto: CreateTransaccionDto, @Req() req: any) {
		const userId = req.user?.sub ?? req.user?.id;
		// req.user.id es el id del usuario autenticado
		console.log('userId from token:', userId, 'body:', dto);
		return this.transaccionService.createTransaccion(dto, Number(userId));
	}

	// Compras del usuario
	@UseGuards(AuthGuard('jwt'))
	@Get('usuario/:userId')
	async getComprasUsuario(@Param('userId') userId: number) {
		return this.transaccionService.getComprasUsuario(userId);
	}

	// Ventas del usuario (como vendedor)
	@UseGuards(AuthGuard('jwt'))
	@Get('vendedor/:userId')
	async getVentasUsuario(@Param('userId') userId: number) {
		return this.transaccionService.getVentasUsuario(userId);
	}
}
