// const now = new Date('2020')
// /*eslint no-global-assign:off*/
// Date = class extends Date {
//     constructor() {
// 		super()
//         return now
//     }
// }

Date.prototype.toDateString = function() {
    return 'this is a date'
}

Date.prototype.toLocaleDateString = function() {
    return 'this is a date'
}

Date.prototype.toLocaleTimeString = function() {
    return 'this is a time'
}

Date.prototype.toTimeString = function() {
    return 'this is a time'
}

Date.prototype.toUTCString = function() {
    return 'this is a time'
}

Date.prototype.getTime = function() {
    return 'this is a time'
}