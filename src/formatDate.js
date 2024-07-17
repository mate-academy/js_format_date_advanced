'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    if (dateMap['YYYY'] && dateMap['YYYY'].length === 4) {
      dateMap['YY'] = dateMap['YYYY'].slice(2);
    }
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateMap['YY'] && dateMap['YY'].length === 2) {
      const year = parseInt(dateMap['YY'], 10);

      if (!isNaN(year)) {
        dateMap['YYYY'] =
          year < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
      }
    }
  }

  const newDate = toFormat
    .slice(0, 3)
    .map((part) => {
      if (dateMap[part] === undefined) {
        throw new Error(`Missing required part '${part}' in the date.`);
      }

      return dateMap[part];
    })
    .join(toSeparator);

  return newDate;
}

module.exports = formatDate;
