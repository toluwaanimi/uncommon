/**
 * This file defines a class LooksrareService which implements the ILooksRareService interface.
 * It provides a method getEvents to fetch events from Looksrare API.
 */

import { Injectable } from '@nestjs/common';
import {
  IEventResponse,
  IEventsQueryParams,
  ILooksRareService,
} from '../../../domain/adapters/looksrare.interface';
import axios from 'axios';

@Injectable()
export class LooksrareService implements ILooksRareService {
  // Base URL of Looksrare API
  baseURL = 'https://api.looksrare.org/api/v2';

  /**
   * This method fetches events from Looksrare API based on provided query params
   * @param payload an object containing query parameters
   * @returns a promise which resolves to an IEventResponse object
   */
  async getEvents(payload?: IEventsQueryParams): Promise<IEventResponse> {
    // URL to fetch events from Looksrare API
    const url = this.baseURL + '/events';

    try {
      // Make GET request to Looksrare API with provided query parameters
      const response = (await axios.get(url, { params: payload })).data;
      // Return response data in a standard format
      return {
        status: true,
        message: response.message,
        data: response.data,
      };
    } catch (e) {
      // If there is an error, return an error response
      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }
}
