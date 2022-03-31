import { CustomError } from 'ts-custom-error'

export class HttpErrorHandler extends CustomError {
    public constructor(
        public statusCode: number,
        message?: string,
    ) {
        super(message)
    }
    public toString() {
        return (this.statusCode + ' - ' + this.message);
    }
}
