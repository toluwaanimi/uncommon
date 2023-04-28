import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at?: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: string;
}
