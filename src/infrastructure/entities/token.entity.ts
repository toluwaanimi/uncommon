import { Column, Entity, Index, OneToOne } from 'typeorm';
import { Collection } from './collection.entity';
import { AbstractEntity } from './base.entity';
import { JoinColumn } from 'typeorm';

@Entity({ name: 'tokens' })
export class Token extends AbstractEntity {
  @Column({ nullable: true })
  tokenId: string;

  @Column({ nullable: true })
  tokenURI: string;

  @Column({ nullable: true })
  isExplicit: boolean;

  @Column({ nullable: true })
  isAnimated: boolean;

  @Column({ nullable: true })
  flag: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  imageURI: string;

  @OneToOne(() => Collection, (collection) => collection.token, {
    eager: true,
  })
  @JoinColumn({ name: 'collection_id' })
  @Index()
  collection?: Collection;

  @Column({ nullable: true })
  collectionId?: string;
}
