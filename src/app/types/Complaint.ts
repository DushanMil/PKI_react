export type ComplaintStatus = 'In progress' | 'Resolved';

export type Complaint = {
  id: string;
  bikeId: string;
  description: string;
  pictureUrl: string;
  status: ComplaintStatus;
};
