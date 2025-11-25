import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['comprador', 'vendedor', 'admin'], default: 'comprador' })
  rol: string;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}