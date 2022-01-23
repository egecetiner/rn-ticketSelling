export class Result {
  public static isSuccess<T>(result: Result): result is SuccessResult<T> {
    return 'value' in result;
  }

  public static isFailure<T>(result: Result): result is ErrorResult<T> {
    return 'error' in result;
  }

  public static ok<U>(value: U): SuccessResult<U> {
    return new SuccessResult<U>(value);
  }

  public static fail<U>(error: NonNullable<U>): ErrorResult<U> {
    console.error(error);
    return new ErrorResult<U>(error);
  }
}

export class SuccessResult<T> extends Result {
  public readonly value: T;

  constructor(value: T) {
    super();
    this.value = value;
    Object.freeze(this);
  }
}

export class ErrorResult<T> extends Result {
  public readonly error: NonNullable<T>;

  constructor(error: NonNullable<T>) {
    super();
    this.error = error;
    Object.freeze(this);
  }
}
