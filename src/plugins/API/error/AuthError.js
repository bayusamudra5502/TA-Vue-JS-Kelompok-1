export class AuthError extends Error {
  constructor(msg, errorObject) {
    super(msg);
    this.errorObject = errorObject;
    this.name = "AuthError";
  }

  printObject() {
    console.dir(this.errorObject);
  }

  isUnathorized() {
    return this.errorObject.status === 401;
  }
}

export class RegisterError extends AuthError {
  constructor(msg, errorObject) {
    super(msg, errorObject);
    this.name = "RegisterError";
  }
}

export class LoginError extends AuthError {
  constructor(msg, errorObject) {
    super(msg, errorObject);
    this.name = "LoginError";
  }
}

export class SessionError extends AuthError {
  constructor(msg, errorObject = null) {
    super(msg, errorObject);
    this.name = "SessionError";
  }
}
