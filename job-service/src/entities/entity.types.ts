export interface Entity {
  id: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  planet: string;
  country: string;
  city: string;
}
