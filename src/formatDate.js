'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const calendar = {
    formatYear(format) {
      if (this.hasOwnProperty('YYYY') && format === 'YY') {
        this['YY'] = this['YYYY'].slice(2, 4);
        delete this['YYYY'];
      } else if (this.hasOwnProperty('YY') && format === 'YYYY') {
        this['YYYY'] = this['YY'] <= 20 ? `20${this['YY']}` : `19${this['YY']}`;
        delete this['YY'];
      }
    },
  };

  const toSeparator = toFormat[toFormat.length - 1];
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const newDate = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    calendar[fromFormat[i]] = newDate[i];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      calendar.formatYear(toFormat[i]);
    }
    result.push(calendar[toFormat[i]]);
  }

  return result.join(toSeparator);
}
module.exports = formatDate;
