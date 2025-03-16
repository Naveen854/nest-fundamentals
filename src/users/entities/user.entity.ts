import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupEntity } from './group.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({default: 0})
  recommendations: number; 

  @ManyToMany(() => GroupEntity, (group) => group.users, { cascade: true })
  @JoinTable()
  groups: GroupEntity[];

}
