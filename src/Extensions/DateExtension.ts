interface Date {
    formattedDateTime(): string;
}

const MONTH_NAMES_SHORT: ReadonlyArray<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Date.prototype.formattedDateTime = function(): string {
    return `${this.toLocaleTimeString()} of ${MONTH_NAMES_SHORT[this.getMonth()]} ${this.getDate()}, ${this.getFullYear()}`;
}
