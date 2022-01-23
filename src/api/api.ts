import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {
  ErrorResult,
  Result,
  SuccessResult,
} from '../utils/error-handling/Result';
import eventsApi from './api-modules/eventsApi';
import paymentApi from './api-modules/iyzico';
import ticketsApi from './api-modules/ticketsApi';
import usersApi from './api-modules/usersApi';
import {
  EmptyResponse,
  SuccessfulResponse,
} from './api-responses/ApiResponses';

class APIConstants {
  readonly baseUrl =
    'https://europe-west1-biletixclone.cloudfunctions.net/app';
  readonly paymentEndpoint = '/payment';
  readonly usersEndpoint = '/users';
  readonly eventsEndpoint = '/events';
  readonly ticketsEndpoint = '/tickets';
}

export class API {
  readonly constants: APIConstants = new APIConstants();
  readonly client: AxiosInstance;
  readonly iyzico: paymentApi = new paymentApi(this);
  readonly users: usersApi = new usersApi(this);
  readonly events: eventsApi = new eventsApi(this);
  readonly tickets: ticketsApi = new ticketsApi(this);

  constructor() {
    const timeout = 6000;

    this.client = axios.create({
      baseURL: this.constants.baseUrl,
      timeout: timeout,
    });

    this.client.interceptors.request.use(
      async function (config) {
        console.log(' ------ ', `${config?.baseURL}${config?.url}`);

        return config;
      },
      function (error) {
        console.error(error);
        // Do something with request error
        return Promise.reject(error);
      },
    );
    this.client.interceptors.response.use(
      function (response) {
        // Do something before request is sent

        console.log(response.status, ' Data: ', `${response?.data}`);

        return response;
      },
      function (error) {
        console.error('Request error', error, error.response?.status);
        // Do something with request error
        return Promise.reject(error);
      },
    );
  }

  async makeRequest<T>(
    request: Promise<AxiosResponse<any>>,
    errorMsg: string,
  ): Promise<SuccessResult<SuccessfulResponse<T>> | ErrorResult<any>> {
    let axiosResponse: AxiosResponse<any>;

    try {
      axiosResponse = await Promise.resolve(request);
    } catch (error: any) {
      if (error.code === 'ECONNABORTED') {
        return Result.fail<any>({
          errorMsg: errorMsg,
          error: error,
          code: 'server-request-timeout',
        });
      } else {
        return Result.fail<any>({
          errorMsg: errorMsg,
          error: error,
          code: 'server-failed-request',
          htmlCode: error.response?.status,
          serverResponseData: error.response?.data,
        });
      }
    }

    const responseObject = axiosResponse.data as
      | SuccessfulResponse<T>
      | EmptyResponse;

    return Result.ok(responseObject as SuccessfulResponse<T>);
  }
}

export const api = new API();
