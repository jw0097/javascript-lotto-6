export class CustomError extends Error {
  constructor(message) {
    super(`${ERROR_MESSAGE.COMMON}${message}`);
    this.name = this.constructor.name;
  }
}

export class NoInputError extends CustomError {}

export class InvalidAmountUnitError extends CustomError {}

export class NotNumberError extends CustomError {}

export class InvalidAmountRangeError extends CustomError {}

export class InvalidLottoNumberCountError extends CustomError {}

export class DuplicatedNumberError extends CustomError {}

export class InvalidBonousNumberCountError extends CustomError {}

export class InvalidNumberRangeError extends CustomError {}