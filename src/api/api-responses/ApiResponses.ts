export type UncheckedResponse =
  | EmptyResponse
  | SuccessfulResponse<NonNullable<any>>
  | ErrorResponse;

export interface SuccessfulResponse<T> {
  data: T;
}

export interface ErrorResponse {
  error: string;
}

export type EmptyResponse =
  | SuccessfulResponse<{} | [] | null | undefined>
  | {}
  | [];
export type FailedResponse = EmptyResponse | ErrorResponse;

export class ApiResponse {
  static isNullOrUndefined(response: any): response is null | undefined {
    return response == null;
  }

  static containsError(
    response: UncheckedResponse,
  ): response is ErrorResponse {
    return (
      !ApiResponse.isNullOrUndefined(response) &&
      'error' in response &&
      response.error != null
    );
  }

  static isEmpty(response: UncheckedResponse): response is EmptyResponse {
    return (
      !ApiResponse.containsError(response) &&
      ApiResponse.containsNullData(response)
    );
  }

  static hasValidData(
    response: UncheckedResponse,
  ): response is SuccessfulResponse<NonNullable<any>> {
    return !ApiResponse.containsError(response) && !ApiResponse.isEmpty;
  }

  private static containsNullData(response: NonNullable<any>): boolean {
    let result = false;

    // Checking for {data: null | undefined}
    if (response.data == null) {
      result = true;
    }

    // Checking for {} and {data: {}}
    if (
      (Object.keys(response).length === 0 &&
        response.constructor === Object) ||
      (Object.keys(response.data).length === 0 &&
        response.data.constructor === Object)
    ) {
      result = true;
    }

    // Checking for [] and {data: []}
    if (
      (Array.isArray(response) && response.length === 0) ||
      (Array.isArray(response.data) && response.data.length === 0)
    ) {
      result = true;
    }

    return result;
  }
}
