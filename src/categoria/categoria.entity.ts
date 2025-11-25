import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id: number;

  @Column()
  nombre: string;
}
