import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { Collection } from './collection.entity';
import { AbstractEntity } from './base.entity';

@Entity({ name: 'orders' })
export class Order extends AbstractEntity {
  @Column({ nullable: true })
  @Index()
  hash: string;

  @Column({ nullable: true })
  quoteType: number;

  @Column({ nullable: true })
  globalNonce: string;

  @Column({ nullable: true })
  subsetNonce: string;

  @Column({ nullable: true })
  orderNonce: string;

  @Column({ nullable: true })
  currency: string;

  @Column({ nullable: true })
  signer: string;

  @Column({ nullable: true })
  strategyId: number;

  @Column({ nullable: true })
  collectionType: number;

  @Column({ nullable: true })
  startTime: number;

  @Column({ nullable: true })
  endTime: number;

  @Column({ nullable: true })
  price: string;

  @Column({ nullable: true })
  additionalParameters: string;

  @Column({ nullable: true })
  signature: string;

  @Column({ nullable: true })
  merkleRoot: string;

  @Column({ nullable: true })
  merkleProof: string;

  @Column('simple-array')
  amounts: string[];

  @Column('simple-array')
  itemIds: string[];

  @Column({ nullable: true })
  status: string;

  @OneToOne(() => Collection, (collection) => collection.order, {
    nullable: true,
  })
  @JoinColumn({ name: 'collection_id' })
  @Index()
  collection?: Collection;

  @Column({ nullable: true })
  collectionId?: string;
}
