import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Carrito } from '../carrito/carrito.entity';
import { Prenda } from '../prenda/prenda.entity';

@Entity('carrito_prenda')
export class CarritoPrenda {
  @PrimaryGeneratedColumn({ name: 'id_carrito_prenda' })
  id: number;

  @ManyToOne(() => Carrito, carrito => carrito.id)
  carrito: Carrito;

  @ManyToOne(() => Prenda, prenda => prenda.id)
  prenda: Prenda;

  @Column()
  cantidad: number;
}
