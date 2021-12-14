import { ApiMessages } from '../../../constants';
import { HttpRequest } from '../../adapters/adapters.types';
import { MakeDeleteEntityDependencies } from './delete-entity.types';

function makeGetOneEntityController<D, K>({
  getOne,
  requestValidator,
}: MakeDeleteEntityDependencies<D, K>) {
  return async (req: HttpRequest) => {
    const validatedReq = await requestValidator(req);

    const result = await getOne(validatedReq);

    return {
      status: 200,
      body: result.payload,
      msg: ApiMessages.FoundSuccessfully,
    };
  };
}

export default makeGetOneEntityController;
