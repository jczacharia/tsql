import { User } from '@tsql/example-lib';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { JobPostEntity } from './job-post.entity';
import { UserPrivateEntity } from './user-private.entity';

@Entity({ name: 'User' })
export class UserEntity implements Required<User> {
  @PrimaryColumn('text')
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  dateCreated!: Date;

  @OneToOne(() => UserPrivateEntity)
  privateData!: UserPrivateEntity;

  @OneToMany(() => JobPostEntity, (e) => e.ownedBy)
  ownedJobs!: JobPostEntity[];
}
