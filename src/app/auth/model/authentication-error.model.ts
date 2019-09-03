import { errorsMap } from './authentication-errors.map';

export class AuthenticationError {

  code: string;
  message: string;

  constructor(_code: string, _message: string) {
    this.code = _code;
    this.message = _message;
  }

  getErrorMessageToDisplay() {
    let msg = errorsMap[this.code];
    if (!msg) {
      msg = 'Missing definition for code ' + this.code + '. Error message ' + this.message;
    }
    return msg;
  }
}
