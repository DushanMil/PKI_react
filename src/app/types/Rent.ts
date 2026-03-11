export type RentStatus = 'finished' | 'inProgress';

export type Rent = {
  bikeId: string;
  bikeType: string;
  pricePerHour: number;
  startTimeMillis: number;
  endTimeMillis: number;
  username: string;
  status: RentStatus;
  totalCost: number;
  pictureUrl: string;
};
