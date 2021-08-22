class NodeCourseError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class InvalidRequestError extends NodeCourseError {
  constructor(message = 'Invalid request') {
    super(message);
    this.status = 400;
  }
}

class UnauthorizedError extends NodeCourseError {
  constructor(message = 'You are not authorized!') {
    super(message);
    this.status = 401;
  }
}

class ForbiddenError extends NodeCourseError {
  constructor(message = 'Forbidden!') {
    super(message);
    this.status = 403;
  }
}

module.exports = {
  NodeCourseError,
  InvalidRequestError,
  UnauthorizedError,
  ForbiddenError,
};
