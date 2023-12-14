export namespace AllExceptions {
  export enum AuthExceptions {
    AccountIsNotVerified = 'Account is not verified. Please verify your email.',
    WrongPassword = 'Wrong password',
    AccessToken = 'Access token expired',
    InvalidAccessToken = 'Invalid access token',
  }

  export enum MatchMakingExceptions {
    AlreadySearching = 'Match is already searching for that user.',
  }

  export enum SessionExceptions {
    SessionNotFound = 'Session not found',
    SessionExpired = 'Session expired',
  }

  export enum StorageExceptions {
    ExtNotAllowed = 'File extension is not allowed',
  }
  export enum UserExceptions {
    UserNotFound = 'User not found',
    UserAlreadyExists = 'User already exists',
  }
}
