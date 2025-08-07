// class apiError extends Error {
//   constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message;
//     this.data = null;
//     this.success = false;
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { apiError };

class apiError extends Error {
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data,
      errors: this.errors,
    };
  }
}

export { apiError };