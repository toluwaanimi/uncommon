// This is an Event model class that extends the BaseModel
import { BaseModel } from './base.model';
import { CollectionModel } from './collection.model';

export class EventModel extends BaseModel {
  collection?: CollectionModel; // Collection associated with the event
  from: string; // Sender of the event
  to: string; // Receiver of the event
  type: string; // Type of the event
  hash: string; // Hash of the event
}
