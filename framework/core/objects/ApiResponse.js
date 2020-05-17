function ApiResponse(HasError = false, Results = null, ErrorMessages = []) {
    this.HasError = HasError;
    this.Results = Results;
    this.Messages = ErrorMessages;
  }

// Exporting error Object
module.exports = ApiResponse;