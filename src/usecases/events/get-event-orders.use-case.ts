import { IUseCaseResponse } from '../../domain/adapters/use-case-response.interface';
import { OrderFilterParams } from '../../domain/adapters/get-event-use-case.interface';
import { IEventRepository } from '../../domain/repositories/event.repository';
import { IOrderRepository } from '../../domain/repositories/order.repository';
import { ILogger } from '../../domain/logger/logger.interface';

export class GetEventOrdersUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly orderRepository: IOrderRepository,
    private readonly logger: ILogger,
  ) {}

  async getOrders(query: OrderFilterParams): Promise<IUseCaseResponse> {
    // Retrieve the list of items from the event repository that match the given query parameters
    const items = await this.eventRepository.getCollectionListing(query);

    // Format the orders for each item and compute the floor price for each associated collection
    const formattedOrders = await Promise.all(
      items.items.map(async (order) => {
        // Check if order.collection.order is null or undefined
        if (!order.collection.order) {
          return null;
        }
        // Extract the relevant fields from the order and its associated collection and token
        const {
          id,
          price,
          endTime,
          signer,
          hash,
          quoteType,
          globalNonce,
          subsetNonce,
          currency,
          startTime,
          itemIds,
          amounts,
        } = order.collection.order;
        const {
          name: collectionName,
          description: collectionDescription,
          symbol: collectionSymbol,
          admin: collectionAdmin,
        } = order.collection;
        const token = order.collection.token;
        const itemId = token?.id;
        const itemName = token?.name;
        const itemDescription = token?.description;
        const imageURI = token?.imageURI;
        const itemIsExplicit = token?.isExplicit;
        const itemIsAnimated = token?.isAnimated;

        // Compute the floor price for the collection associated with the current order
        const floorPrice = await this.orderRepository.getCollectionFloorPrice(
          order.collection.id as string,
        );

        // Format the price field and return the formatted order object
        const formattedPrice = {
          wei: price,
          ether: Number(price) / 10 ** 18,
        };

        return {
          id,
          price: formattedPrice,
          expiration: endTime,
          maker: signer,
          collection: {
            id: order.collection.id,
            name: collectionName,
            description: collectionDescription,
            symbol: collectionSymbol,
            admin: collectionAdmin,
            floorPrice,
            websiteLink: order.collection.websiteLink,
            facebookLink: order.collection.facebookLink,
            instagramLink: order.collection.instagramLink,
            telegramLink: order.collection.telegramLink,
            mediumLink: order.collection.mediumLink,
            discordLink: order.collection.discordLink,
            isVerified: order.collection.isVerified,
            isExplicit: order.collection.isExplicit,
            logoURI: order.collection.logoURI,
            bannerURI: order.collection.bannerURI,
          },
          order: {
            id: order.collection.order.id,
            hash,
            quoteType,
            globalNonce,
            subsetNonce,
            currency,
            startTime,
            itemIds,
            amounts,
          },
          item: token
            ? {
                id: itemId ? itemId : null,
                name: itemName,
                description: itemDescription,
                imageURI,
                isExplicit: itemIsExplicit,
                isAnimated: itemIsAnimated,
              }
            : {},
        };
      }),
    );

    const filteredOrders = formattedOrders.filter((order) => order !== null);

    // Return the formatted orders along with the metadata about the query results
    return {
      data: filteredOrders,
      meta: items.meta,
    };
  }
}
