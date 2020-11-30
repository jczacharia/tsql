import { UserPrivate } from '@tsql/example-lib';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'UserPrivate' })
export class UserPrivateEntity implements Required<UserPrivate> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  ssn!: number;

  @Column()
  birthDate!: Date;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  publicData!: UserEntity;
}
