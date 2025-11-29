import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  hashedPassword: string;

  @Column({ name: 'first_name', type: 'varchar' })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: true })
  lastName: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  public async setPassword(password: string, salt = 12) {
    this.hashedPassword = await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string) {
    return await bcrypt.compare(password, this.hashedPassword);
  }

  static async doCompareRandom() {
    await bcrypt.compare(
      '123456',
      '$2b$12$12345678901234567890123456789012345678901234567890',
    );
  }
}
