// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Calculates time elapsed since date given and returns
// the appropriate time unit, rounding down to nearest whole
// number 
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function getElapsedTime(prevDate) {
    let diff   = Date.now() - prevDate,
        min    = Math.floor(diff / 60000),  // 60,000 ms / min
        hrs    = Math.floor(diff / 3600000), // 3,600,000 ms / hr
        days   = Math.floor(diff / 86400000), // 6,400,000 ms / day
        months = Math.floor(diff / 2629746000),// 2629746000 ms / month
        years  = Math.floor(diff / 31556952000);// 31,556,952,000 ms / year
    
    if (min < 60) {
        if(min < 1)        return 'just now';
        else if(min === 1) return 'a minute ago';
        else               return min + ' minutes ago';
    } else if (hrs < 24) {
        return `${hrs} ${hrs === 1 ? 'hour' : 'hours'} ago`;
    } else if (days < 31) {
        return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (months < 12) {
        return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
        return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
}