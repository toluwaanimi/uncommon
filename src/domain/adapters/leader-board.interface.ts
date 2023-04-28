// Importing an interface from a file called 'service.interface'
import { ServiceInterface } from './service.interface';

// This interface defines the shape of a data item object
export interface DataItem {
  id: string; // ID of the data item
  collection_id: string; // ID of the collection the data item belongs to
  entry_id: string; // ID of the entry the data item belongs to
  follower_id: number; // ID of the follower associated with the data item
}

// This interface defines methods for getting top entries and top collections from a leaderboard
export interface ILeaderBoard {
  getTopEntries(): Promise<ServiceInterface>; // Method for getting the top entries from the leaderboard
  getTopCollections(): Promise<ServiceInterface>; // Method for getting the top collections from the leaderboard
}
