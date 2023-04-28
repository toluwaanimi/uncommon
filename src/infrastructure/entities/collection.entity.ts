import { Entity, Column, OneToOne, Index } from 'typeorm';
import { AbstractEntity } from './base.entity';
import { Event } from './event.entity';
import { JoinColumn } from 'typeorm';
import { Token } from './token.entity';
import { Order } from './order.entity';

@Entity({ name: 'collections' })
export class Collection extends AbstractEntity {
  @Column({ nullable: true })
  @Index()
  address: string;

  @Column({ nullable: true })
  owner: string;

  @Column({ nullable: true })
  setter: string;

  @Column({ nullable: true })
  admin: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  websiteLink: string;

  @Column({ nullable: true })
  facebookLink: string;

  @Column({ nullable: true })
  twitterLink: string;

  @Column({ nullable: true })
  instagramLink: string;

  @Column({ nullable: true })
  telegramLink: string;

  @Column({ nullable: true })
  mediumLink: string;

  @Column({ nullable: true })
  discordLink: string;

  @Column({ nullable: true })
  isVerified: boolean;

  @Column({ nullable: true })
  isExplicit: boolean;

  @Column({ nullable: true })
  logoURI: string;

  @Column({ nullable: true })
  bannerURI: string;

  @OneToOne(() => Event, (event) => event.collection)
  @JoinColumn({ name: 'event_id' })
  @Index()
  event?: Event;

  @Column({ nullable: true })
  eventId?: string;

  @OneToOne(() => Token, (token) => token.collection, {
    nullable: true,
  })
  token: Token;

  @OneToOne(() => Order, (token) => token.collection, {})
  order: Order;
}
