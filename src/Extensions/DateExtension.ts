interface Date {
    formattedDateTime(): string;
}

const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Date.prototype.formattedDateTime = function(): string {
    return `${this.toLocaleTimeString()} of ${monthShortNames[this.getMonth()]} ${this.getDate()}, ${this.getFullYear()}`;
}
