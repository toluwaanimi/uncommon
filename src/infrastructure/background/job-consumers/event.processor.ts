import { LooksrareService } from '../../services/looksrare/looksrare.service';
import { Job } from 'bull';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../entities/event.entity';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AppDataSource } from '../../config/typeorm';
import { Collection } from '../../entities/collection.entity';
import { Token } from '../../entities/token.entity';
import { Order } from '../../entities/order.entity';

@Processor('events')
export class EventsProcessor {
  constructor(
    private readonly looksrareService: LooksrareService,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  /**
   * This function processes a single event
   * @param {Job} job - The job to process
   * @returns {Promise<void>}
   */
  @Process('processEvent')
  async processEventsSingle(job: Job<any>) {
    const { data } = job;

    // Check if the event already exists in the database
    const existingEvent = await this.eventRepository.findOne({
      where: {
        id: data.id,
      },
    });

    if (!existingEvent) {
      // If the event does not exist, start a new transaction to save the event, collection, order, and token entities to the database
      const queryRunner = AppDataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        // Save the event entity to the database
        const event = await queryRunner.manager.save(Event, {
          id: data.id,
          from: data.from,
          type: data.type,
          hash: data.hash,
          to: data.to,
        });

        // Save the collection entity to the database
        const collection = await queryRunner.manager.save(Collection, {
          id: uuidv4(),
          name: data.collection.name,
          address: data.collection.address,
          setter: data.collection.setter,
          admin: data.collection.admin,
          description: data.collection.description,
          symbol: data.collection.symbol,
          websiteLink: data.collection.websiteLink,
          facebookLink: data.collection.facebookLink,
          twitterLink: data.collection.twitterLink,
          instagramLink: data.collection.instagramLink,
          mediumLink: data.collection.mediumLink,
          discordLink: data.collection.discordLink,
          isVerified: data.collection.isVerified,
          isExplicit: data.collection.isExplicit,
          bannerURI: data.collection.bannerURI,
          logoURI: data.collection.logoURI,
          eventId: event.id,
        });

        // Save the order entity to the database
        await queryRunner.manager.save(Order, {
          id: data.order.id,
          hash: data.order.hash,
          quoteType: data.order.quoteType,
          globalNonce: data.order.globalNonce,
          subsetNonce: data.order.subsetNonce,
          orderNonce: data.order.orderNonce,
          currency: data.order.currency,
          signer: data.order.signer,
          strategyId: data.order.strategyId,
          collectionType: data.order.collectionType,
          startTime: data.order.startTime,
          endTime: data.order.endTime,
          price: data.order.price,
          additionalParameters: data.order.additionalParameters,
          signature: data.order.signature,
          merkleProof: data.order.merkleProof,
          merkleRoot: data.order.merkleRoot,
          amounts: data.order.amounts,
          itemIds: data.order.itemIds,
          status: data.order.status,
          collectionId: collection.id,
        });

        // Save the token entity to the database
        if (data.token) {
          await queryRunner.manager.save(Token, {
            id: data.token.id.toString(),
            tokenId: data.token.tokenId,
            isExplicit: data.token.isExplicit,
            isAnimated: data.token.isAnimated,
            flag: data.token.flag,
            name: data.token.name,
            description: data.token.description,
            imageURI: data.token.imageURI,
            collectionId: collection.id,
          });
        }

        // Commit the transaction
        await queryRunner.commitTransaction();
      } catch (e) {
        console.log(e);
        // Rollback the transaction if an error occurs
        await queryRunner.rollbackTransaction();
      } finally {
        // Release the query runner
        await queryRunner.release();
      }
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`Processing job ${job.id} of type ${job.name} with data ...`);
  }
}
