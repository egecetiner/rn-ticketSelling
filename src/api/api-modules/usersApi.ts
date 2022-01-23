import auth from '@react-native-firebase/auth';
import {AppError} from '../../utils/error-handling/AppError';
import {
  ErrorResult,
  Result,
  SuccessResult,
} from '../../utils/error-handling/Result';
import {API} from '../Api';

type PopulatableField = 'phoneNumber' | 'email' | 'name' | 'isPersonal';

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

class usersApi {
  api: API;
  private endpoint: string;

  constructor(api: API) {
    this.api = api;
    this.endpoint = api.constants.usersEndpoint;
  }

  async getUser(id: string) {
    if (id.trim() === '' || id.trim().length < 2) {
      return Result.fail({
        errorMsg: 'User ID is empty',
        code: 'bad-format',
      });
    }

    const reqResult = await this.api.makeRequest<any>(
      this.api.client.get(this.endpoint + `/${id}`),
      `Error while fetching user ID '${id}' from API`,
    );

    if (Result.isSuccess(reqResult)) {
      const user = reqResult.value;

      return Result.ok(user);
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

  async getAllUsers(
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
      'Error while fetching users from API',
    );

    if (Result.isSuccess(reqResult)) {
      const users = reqResult.value;
      return Result.ok(users);
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

  async addUser(
    phoneNumber: any,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.post(
        this.endpoint + `/${await auth().currentUser.uid}`,
        {
          phoneNumber: phoneNumber,
        },
      ),
      `Error while adding user with '${phoneNumber}' number to the server`,
    );

    if (Result.isSuccess(reqResult)) {
      return Result.ok(reqResult.value.data);
    } else {
      return reqResult;
    }
  }

  async updateUser(
    id: string,
    name: string,
    mail: any,
    city?: string,
    adress?: string,
    identityNumber?: number,
    isPersonal?: any,
    profileImage?: any,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    const reqResult = await this.api.makeRequest<any>(
      this.api.client.put(this.endpoint + `/${id}`, {
        name: name,
        mail: mail,
        isPersonal: isPersonal,
        profileImage: profileImage,
        city: city,
        adress: adress,
        identityNumber,
      }),
      `Error while updating user with '${id}' id in the server`,
    );

    if (Result.isSuccess(reqResult)) {
      return Result.ok(reqResult.value.data);
    } else {
      return reqResult;
    }
  }

  async deleteUser(
    id: string,
  ): Promise<SuccessResult<any> | ErrorResult<AppError>> {
    if (id.trim() === '' || id.trim().length < 2) {
      return Result.fail<AppError>({
        errorMsg: 'User ID is empty',
        code: 'bad-format',
      });
    }

    const reqResult = await this.api.makeRequest<any>(
      this.api.client.delete(this.endpoint + `/${id}`),
      `Error while deleting user ID '${id}' from API`,
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
}

export default usersApi;
