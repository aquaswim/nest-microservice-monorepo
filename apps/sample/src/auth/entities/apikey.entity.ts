import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryColumn('varchar', {
    length: 36,
  })
  key: string;

  @Column()
  name: string;
}
