export class BlogError extends Error {
  constructor(msg, errorObj) {
    super(msg);
    this.errorObj = errorObj;
    this.name = "BlogError";
  }

  printObject() {
    console.dir(this.errorObject);
  }

  isUnathorized() {
    return this.errorObject.status === 401;
  }

  isNotFound() {
    return this.errorObject.status === 404;
  }
}
