'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const dateParts = date.split(separatorFrom);
  const newDate = {};

  for (let i = 0; i < dateParts.length; i++) {
    const key = fromFormat[i];
    const value = dateParts[i];

    newDate[key] = value;
  }

  const resultDate = toFormat
    .map((e) => {
      if (!newDate[e]) {
        if (e === 'YY') {
          return newDate.YYYY.slice(-2);
        } else {
          const end = newDate.YY;
          let start;

          if (end >= 30) {
            start = 19;
          } else {
            start = 20;
          }

          return `${start}${end}`;
        }
      } else {
        return newDate[e];
      }
    })
    .join(separatorTo);

  return resultDate;
}

module.exports = formatDate;
