import { RequestValidator } from '../../adapters/adapters.types';

export interface MakeDeleteEntityDependencies<T, K> {
  getOne: (query: K) => Promise<{ payload: T }>;
  requestValidator: RequestValidator<K>;
}
