import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly usuarioService: UsuarioService,
	) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		const user = await this.authService.validateUser(loginDto.email, loginDto.password);
		if (!user) {
			throw new UnauthorizedException('Credenciales inválidas');
		}
		return this.authService.login(user);
	}

	@Post('register')
	async register(@Body() body: any) {
		const hashedPassword = await bcrypt.hash(body.password, 10);
		const newUser = await this.usuarioService.create({
			...body,
			password: hashedPassword,
		});
		return this.authService.login(newUser);
	}

	// Ejemplo de ruta protegida solo para admin
		@Get('admin-only')
		@UseGuards(AuthGuard('jwt'), RolesGuard)
		@Roles('admin')
		adminOnly() {
			return { message: 'Solo admin puede ver esto' };
		}
}
