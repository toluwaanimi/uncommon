// This is a Token model class that extends the BaseModel
import { BaseModel } from './base.model';
import { CollectionModel } from './collection.model';

export class TokenModel extends BaseModel {
  tokenId: string; // ID of the token
  tokenURI: string; // URI of the token
  isExplicit: boolean; // Whether the token is explicit or not
  isAnimated: boolean; // Whether the token is animated or not
  flag: string; // Flag of the token
  name: string; // Name of the token
  description: string; // Description of the token
  imageURI: string; // URI of the token image
  collection?: CollectionModel; // Collection associated with the token
  collectionId?: string; // ID of the associated collection
}
