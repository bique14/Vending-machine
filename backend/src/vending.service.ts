import { Injectable } from '@nestjs/common';

const vendingData = require('./mock/data.json');

@Injectable()
export class VendingService {
  getAllData(): any {
    return vendingData;
  }

  getByLocation(locationId): any[] {
    const { location } = vendingData;
    const filtered = filterByLocation(location, locationId);
    const result = filtered.length ? filtered : 'Location not found';

    return result;
  }
}

const filterByLocation = (locations, locationId) =>
  locations.filter((l) => l.id == locationId);
