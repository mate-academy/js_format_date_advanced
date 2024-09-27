'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';

  const newSeparator = toFormat[toFormat.length - 1];
  const oldSeparator = fromFormat[fromFormat.length - 1];

  const oldDateArray = date.split(oldSeparator);

  const dateConverter = {
    YYYY: '',
    YY: '',
    DD: '',
    MM: '',
  };

  for (let i = 0; i < (fromFormat.length - 1); i++) {
    dateConverter[`${fromFormat[i]}`] = oldDateArray[i];

    if (!dateConverter.YY) {
      dateConverter.YY = dateConverter.YYYY.slice(2);
    }

    if (!dateConverter.YYYY) {
      const number = dateConverter.YY;

      const century = number < 30 ? '20' : '19';

      dateConverter.YYYY = century + dateConverter.YY;
    }
  }

  const dateTypes = 3;

  for (let i = 0; i < (toFormat.length - 1); i++) {
    result += dateConverter[`${toFormat[i]}`];

    if (i < dateTypes - 1) {
      result += newSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
