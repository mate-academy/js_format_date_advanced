'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [p1, p2, p3, oldStep] = fromFormat;

  const newDate = date.split(oldStep);
  const [val1, val2, val3] = newDate;

  const dateObj = {
    [p1]: val1,
    [p2]: val2,
    [p3]: val3,
  };

  if (dateObj.YYYY) {
    dateObj.YY = dateObj.YYYY.slice(-2);
  } else if (dateObj.YY) {
    if (dateObj.YY < 30) {
      dateObj.YYYY = '20' + dateObj.YY;
    } else {
      dateObj.YYYY = '19' + dateObj.YY;
    }
  }

  const [t1, t2, t3, newStep] = toFormat;

  return [dateObj[t1], dateObj[t2], dateObj[t3]].join(newStep);
}

module.exports = formatDate;
