import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../categoria/categoria.entity';
import { Usuario } from '../usuario/usuario.entity';

@Entity('prendas')
export class Prenda {
  @PrimaryGeneratedColumn({ name: 'id_prenda' })
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  talle: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ name: 'imagen_url', nullable: true })
  imagen_url: string;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  @ManyToOne(() => Usuario, usuario => usuario.id)
  @JoinColumn({ name: 'vendedor_id' })
  vendedor: Usuario;

  @ManyToOne(() => Categoria, categoria => categoria.id)
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column({ name: 'created_at', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
