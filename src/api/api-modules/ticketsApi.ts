import {AppError} from '../../utils/error-handling/AppError';
import {
  ErrorResult,
  Result,
  SuccessResult,
} from '../../utils/error-handling/Result';
import {API} from '../Api';

type PopulatableField = 'eventId' | 'userId';

type PopulateOptions = PopulatableField[];

function getPopulateQueryVariables(fields: PopulateOptions): string {
  if (fields.length === 0) {
    return '';
  } else {
    return fields
      .map((f) => {
        return `populate[]=${f}`;
      })
      .join('&');
  }
}

class ticketsApi {
  api: API;
  private endpoint: string;

  constructor(api: API) {
    this.api = api;
    this.endpoint = api.constants.ticketsEndpoint;
  }

  async getTicket(id: string) {
    if (id.trim() === '' || id.trim().length < 2) {
      return Result.fail({
        errorMsg: 'Ticket ID is empty',
        code: 'bad-format',
      });
    }

    const reqResult = await this.api.makeRequest<any>(
      this.api.client.get(this.endpoint + `/${id}`),
      `Error while fetching ticket ID '${id}' from API`,
    );

    if (Result.isSuccess(reqResult)) {
      const ticket = reqResult.value;

      return Result.ok(ticket);
    } else {
      // Error handling
      if (reqResult.error.code === 'server-failed-request') {
        const apiError = reqResult.error;

        if (apiError.htmlCode === 404) {
          return Result.fail({
            ...reqResult.error,
            errorMsg: `No User with ID '${id}' was found`,
            code: 'resource-not-found',
          });
        } else {
          return reqResult;
        }
      }
      return reqResult;
    }
  }

  async getAllTickets(
    params?: any,
    fieldsToPopulate: PopulateOptions = [],
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.get(
        this.endpoint + '?' + getPopulateQueryVariables(fieldsToPopulate),
        {
          params,
        },
      ),
      'Error while fetching tickets from API',
    );

    if (Result.isSuccess(reqResult)) {
      const tickets = reqResult.value;
      return Result.ok(tickets);
    } else {
      // Error handling
      if (reqResult.error.code === 'server-failed-request') {
        const apiError = reqResult.error;

        if (apiError.htmlCode === 404) {
          return Result.fail<any>({
            ...reqResult.error,
            errorMsg: `There is no user`,
            code: 'resource-not-found',
          });
        } else {
          return reqResult;
        }
      }
      return reqResult;
    }
  }

  async updateTicket(
    id: string,
    read: boolean,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.put(this.endpoint + `/${id}`, {
        read: read,
      }),
      `Error while updating ticket with '${id}' id in the server`,
    );

    if (Result.isSuccess(reqResult)) {
      return Result.ok(reqResult.value.data);
    } else {
      return reqResult;
    }
  }

  async deleteTicket(
    id: string,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.delete(this.endpoint + `/${id}`),
      `Error while deleting ticket ID '${id}' from API`,
    );

    if (Result.isSuccess(reqResult)) {
      const user = reqResult.value;

      return Result.ok(user);
    } else {
      // Error handling
      if (reqResult.error.code === 'server-failed-request') {
        const apiError = reqResult.error;

        if (apiError.htmlCode === 404) {
          return Result.fail<any>({
            ...reqResult.error,
            errorMsg: `No Ticket with ID '${id}' was found`,
            code: 'resource-not-found',
          });
        } else {
          return reqResult;
        }
      }
      return reqResult;
    }
  }
}

export default ticketsApi;
