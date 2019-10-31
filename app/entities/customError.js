module.exports = class CustomError {
    constructor(status, message) {
        this.status = status;
        if(!message) {
            if(this.status === 404) {
                this.default404();
            } else if(this.status === 500) {
                this.default500();
            }
        } else {
            this.message = message;
        }
    }

    setMessage(message) {
        this.message = message;
    }

    default404() {
        this.message = {
            message: 'Not found'
        };
    }

    default500() {
        this.message = {
            message: 'Internal server error'
        };
    }
}