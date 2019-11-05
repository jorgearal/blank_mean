module.exports = class CustomError {
    constructor(status, message, err) {
        this.status = status;
        this.err = err;
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
        this.message = 'Not found';
        this.err = '';
    }

    default500() {
        this.message = 'Internal server error';
    }
}