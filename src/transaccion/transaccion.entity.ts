import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('transacciones')
export class Transaccion {
  @PrimaryGeneratedColumn({ name: 'id_transaccion' })
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column('decimal', { name: 'total', precision: 10, scale: 2 })
  total: number;

  @Column({ name: 'metodo_pago', type: 'varchar', length: 50, nullable: true })
  metodoPago: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
