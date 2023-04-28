// This is an Order model class that extends the BaseModel
import { BaseModel } from './base.model';
import { CollectionModel } from './collection.model';

export class OrderModel extends BaseModel {
  hash: string; // Hash of the order
  quoteType: number; // Quote type of the order
  globalNonce: string; // Global nonce of the order
  subsetNonce: string; // Subset nonce of the order
  orderNonce: string; // Order nonce of the order
  currency: string; // Currency used in the order
  signer: string; // Signer of the order
  strategyId: number; // Strategy ID of the order
  collectionType: number; // Type of the collection associated with the order
  startTime: number; // Start time of the order
  endTime: number; // End time of the order
  price: string; // Price of the order
  additionalParameters: string; // Additional parameters of the order
  signature: string; // Signature of the order
  merkleRoot: string | null; // Merkle root of the order
  merkleProof: string | null; // Merkle proof of the order
  amounts: string[]; // Amounts associated with the order
  itemIds: string[]; // Item IDs associated with the order
  status: string; // Status of the order
  collection?: CollectionModel; // Collection associated with the order
}
