'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
    const oldParts = fromFormat.slice(0, 3);
    const oldSeparator = fromFormat[3];
    
    const newParts = toFormat.slice(0, 3);
    const newSeparator = toFormat[3];
    
    const dateValues = date.split(oldSeparator);
    const map = {};
    for (let i = 0; i < 3; i++) {
        map[oldParts[i]] = dateValues[i];
    }
    
    let year = map['YYYY'] || map['YY'];
    if (year) {
        if (year.length === 4 && !toFormat.includes('YYYY') && toFormat.includes('YY')) {
            year = year.slice(-2);
        } else if (year.length === 2 && !toFormat.includes('YY') && toFormat.includes('YYYY')) {
            const num = parseInt(year, 10);
            year = (num < 30 ? '20' : '19') + year;
        }
        map['YYYY'] = year;
        map['YY'] = year;
    }
    
    const resultParts = newParts.map(token => map[token]);
    
    return resultParts.join(newSeparator);
}

module.exports = formatDate;
