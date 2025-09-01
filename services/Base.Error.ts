class BaseError extends Error{
    httpStatusCode: number;
    isOperational: boolean;
    constructor(name:string,httpStatusCode:number,discription:string,isOperational:boolean){
        super(discription);
        Object.setPrototypeOf(this,new.target.prototype);
        this.name = name;
        this.httpStatusCode=httpStatusCode;
        this.isOperational =isOperational;

        Error.captureStackTrace(this);
    }
}
export {BaseError};