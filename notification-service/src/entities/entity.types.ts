export interface Entity {
  id: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  planet: string;
  country: string;
  city: string;
}
