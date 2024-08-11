import { ServiceUnavailableError } from './types/error-types.data';

export class KafkaTrasformersService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public TrasformersDataObject(data: any): any {
    if (data.error) {
      throw new ServiceUnavailableError(`t24 Service Unavailable`);
    } else {
      return data.message.Data;
    }
  }

  public TrasformersAuthObject(data: any): boolean {
    return !data.error;
  }
}
