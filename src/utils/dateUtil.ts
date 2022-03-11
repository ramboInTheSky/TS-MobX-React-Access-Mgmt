export const getDateTimeString = (date?: string) => {
    if (date) {
        const dateObj = new Date(date)
        if (dateObj.toString() !== 'Invalid Date') {
            return `${dateObj.toDateString()}, ${dateObj.toLocaleTimeString(
                navigator.language,
                {
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit',
                }
            )}`
        }
        return dateObj.toString()
    }
    return 'The Future'
}
