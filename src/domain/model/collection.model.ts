// This is a Collection model class that extends the BaseModel
import { BaseModel } from './base.model';
import { EventModel } from './event.model';
import { TokenModel } from './token.model';
import { OrderModel } from './order.model';

export class CollectionModel extends BaseModel {
  address: string; // Address of the collection
  owner: string; // Owner of the collection
  setter: string; // Setter of the collection
  admin: string; // Admin of the collection
  name: string; // Name of the collection
  description: string; // Description of the collection
  symbol: string; // Symbol of the collection
  websiteLink: string; // Website link of the collection
  facebookLink: string; // Facebook link of the collection
  twitterLink: string; // Twitter link of the collection
  instagramLink: string; // Instagram link of the collection
  telegramLink: string; // Telegram link of the collection
  mediumLink: string; // Medium link of the collection
  discordLink: string; // Discord link of the collection
  isVerified: boolean; // Whether the collection is verified or not
  isExplicit: boolean; // Whether the collection is explicit or not
  logoURI: string; // URI of the collection logo
  bannerURI: string; // URI of the collection banner
  event?: EventModel; // Event associated with the collection
  token?: TokenModel; // Token associated with the collection
  order?: OrderModel; // Order associated with the collection
}
