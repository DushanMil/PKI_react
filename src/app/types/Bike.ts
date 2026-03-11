export type BikeStatus = 'Operating' | 'Repairing' | 'Removed';

export type Bike = {
  bikeId: string;
  bikeType: string;
  pricePerHour: number;
  latitude: number;
  longitude: number;
  parkingDistances: number[];
  screenPosition: number[];
  status: BikeStatus;
};
