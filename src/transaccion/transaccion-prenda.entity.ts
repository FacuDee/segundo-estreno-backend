import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Transaccion } from '../transaccion/transaccion.entity';
import { Prenda } from '../prenda/prenda.entity';

@Entity('transaccion_prenda')
export class TransaccionPrenda {
  @PrimaryColumn({ name: 'id_transaccion', type: 'int' })
  idTransaccion: number;

  @PrimaryColumn({ name: 'id_prenda', type: 'int' })
  idPrenda: number;

  @Column({ name: 'precio_vendido', type: 'decimal', precision: 10, scale: 2 })
  precioVendido: number;

  @ManyToOne(() => Transaccion, transaccion => transaccion.id)
  @JoinColumn({ name: 'id_transaccion' })
  transaccion: Transaccion;

  @ManyToOne(() => Prenda, prenda => prenda.id)
  @JoinColumn({ name: 'id_prenda' })
  prenda: Prenda;
}
