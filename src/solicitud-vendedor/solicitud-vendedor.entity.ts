import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('solicitudes_vendedor')
export class SolicitudVendedor {
  @PrimaryGeneratedColumn({ name: 'id_solicitud' })
  id: number;

  @Column({ name: 'usuario_id' })
  userId: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'status', default: 'pendiente' })
  status: 'pendiente' | 'aceptada' | 'rechazada';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}