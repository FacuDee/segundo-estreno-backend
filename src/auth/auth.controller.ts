import { Controller, Post, Body, UnauthorizedException, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

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
}
