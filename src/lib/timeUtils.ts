export const timeSince = (since: number) => {
    const currentDate = Date.now()

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const elapsed = currentDate - since;

    if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + ' s'
    if (elapsed < msPerHour) return Math.round(elapsed / msPerMinute) + ' m'
    if (elapsed < msPerDay ) return Math.round(elapsed / msPerHour ) + ' h'
    if (elapsed < msPerMonth) return Math.round(elapsed / msPerDay) + ' d'
    if (elapsed < msPerYear) return Math.round(elapsed / msPerMonth) + ' mo'

    return Math.round(elapsed / msPerYear) + ' y'
}