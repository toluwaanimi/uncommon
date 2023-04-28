import { Column, Entity, Index, OneToOne, Unique } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { Collection } from './collection.entity';

@Entity({ name: 'events' })
export class Event extends AbstractEntity {
  @Column({ nullable: true })
  from: string;

  @Column({ nullable: true })
  to: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  @Index()
  hash: string;

  @OneToOne(() => Collection, (collection) => collection.event, {
    nullable: true,
  })
  collection: Collection;

  // @Index(['collection', 'type'])
  // collectionTypeIndex: string;
}
