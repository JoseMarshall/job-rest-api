export interface GetAll {
  page: string;
  limit?: string;
  sort?: string;
}

export type Optional<T> = { [P in keyof T]?: T[P] };
