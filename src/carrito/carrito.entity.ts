import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('carritos')
export class Carrito {
  @PrimaryGeneratedColumn({ name: 'id_carrito' })
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  usuario: Usuario;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
