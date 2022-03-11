export const toName: any = (str: string) => {
    const ret = str
        .replace(/([a-z\d])([A-Z])/g, '$1' + ' ' + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + '$2')
    return capitalize(ret)
}

export const capitalize = (s: string) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
