// This interface defines the shape of a collection object
export interface ICollection {
  address: string; // Address of the collection
  owner: string; // Owner of the collection
  setter: string | null; // Setter of the collection, if any
  admin: string | null; // Admin of the collection, if any
  name: string; // Name of the collection
  description: string | null; // Description of the collection, if any
  symbol: string | null; // Symbol of the collection, if any
  type: string; // Type of the collection
  websiteLink: string | null; // Link to the website of the collection, if any
  facebookLink: string | null; // Link to the Facebook page of the collection, if any
  twitterLink: string | null; // Link to the Twitter page of the collection, if any
  instagramLink: string | null; // Link to the Instagram page of the collection, if any
  telegramLink: string | null; // Link to the Telegram group of the collection, if any
  mediumLink: string | null; // Link to the Medium page of the collection, if any
  discordLink: string | null; // Link to the Discord server of the collection, if any
  isVerified: boolean; // Whether the collection is verified or not
  isExplicit: boolean; // Whether the collection is explicit or not
  logoURI: string; // URI of the logo image of the collection
  bannerURI: string; // URI of the banner image of the collection
}

// This interface defines the shape of a token object
export interface IToken {
  id: number; // ID of the token
  collectionAddress: string; // Address of the collection the token belongs to
  tokenId: string; // ID of the token within its collection
  tokenURI: string | null; // URI of the token metadata, if any
  isExplicit: boolean; // Whether the token is explicit or not
  isAnimated: boolean; // Whether the token is animated or not
  flag: string; // Flag of the token
  name: string; // Name of the token
  description: string; // Description of the token
  imageURI: string; // URI of the image of the token
}

// This interface defines the shape of an order object
export interface IOrder {
  id: string; // ID of the order
  hash: string; // Hash of the order
  quoteType: number; // Quote type of the order
  globalNonce: string; // Global nonce of the order
  subsetNonce: string; // Subset nonce of the order
  orderNonce: string; // Order nonce of the order
  collection: string; // Collection of the order
  currency: string; // Currency of the order
  signer: string; // Signer of the order
  strategyId: number; // Strategy ID of the order
  collectionType: number; // Collection type of the order
  startTime: number; // Start time of the order
  endTime: number; // End time of the order
  price: string; // Price of the order
  additionalParameters: string; // Additional parameters of the order
  signature: string; // Signature of the order
  merkleRoot: string | null; // Merkle root of the order, if any
  merkleProof: string | null; // Merkle proof of the order, if any
  amounts: string[]; // Amounts of the order
  itemIds: string[]; // Item IDs of the order
  status: string; // Status of the order
}

// This interface defines the shape of an event object
export interface IEvent {
  collection: ICollection; // Collection associated with the event
  token: IToken; // Token associated with the event
  order: IOrder; // Order associated with the event
  id: string; // ID of the event
  from: string; // Sender of the event
  to: string | null; // Receiver of the event, if any
  type: string; // Type of the event
  hash: string | null; // Hash of the event, if any
  createdAt: string; // Creation date of the event
}

// This type defines the possible event types
export type EventType =
  | 'LIST'
  | 'SALE'
  | 'CANCEL_LIST'
  | 'OFFER'
  | 'CANCEL_OFFER'
  | 'MINT'
  | 'TRANSFER';

// This interface defines the query parameters for events
export interface IEventsQueryParams {
  collection?: string; // Collection of the event
  tokenId?: string; // Token ID of the event
  from?: string; // Sender of the event
  to?: string; // Receiver of the event
  type?: EventType; // Type of the event
  pagination?: {
    first?: number; // Number of items to return in the first page
    cursor?: number; // Index of the current item for pagination
  };
}

// This interface defines the shape of an event response
export interface IEventResponse {
  status: boolean; // Status of the response
  message?: string | null; // Message of the response, if any
  data?: IEvent[]; // Array of events returned by the response, if any
}

// This interface defines the shape of the LooksRare service
export interface ILooksRareService {
  getEvents(payload?: IEventsQueryParams): Promise<IEventResponse>; // Method to retrieve events using the specified query parameters
}
