// Some Typescript magic to derive the type of ApiError.code!
const errorCodes = {
  notInitialised: 'module-not-initialized',
  badFormat: 'bad-format',

  permissionRequestError: 'permission-request-error',
  firebaseRequiresRecentLogin: 'firebase-requires-recent-login',
  nonExistantEmail: 'non-existant-email',
  nonItems: 'cannot-create-order-with-no-items',
} as const;

export interface AppError {
  errorMsg: string;
  code?: typeof errorCodes[keyof typeof errorCodes];
  error?: any;
}
