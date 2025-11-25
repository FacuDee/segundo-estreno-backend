import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly usuarioService: UsuarioService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usuarioService.findByEmail(email);
		if (user && await bcrypt.compare(password, user.password)) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
	const payload = { sub: user.id, username: user.username, email: user.email, rol: user.rol };
		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
