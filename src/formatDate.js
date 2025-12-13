'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DateTokens = {
    FULL_YEAR: 'YYYY',
    SHORT_YEAR: 'YY',
    MONTH: 'MM',
    DAY: 'DD',
  };
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateArr = date.split(fromSeparator);
  const result = [];

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < dateArr.length; i++) {
    switch (fromFormat[i]) {
      case DateTokens.FULL_YEAR:
        year = dateArr[i];
        break;

      case DateTokens.SHORT_YEAR:
        if (Number(dateArr[i]) < 30) {
          year = '20' + dateArr[i];
        } else {
          year = '19' + dateArr[i];
        }
        break;

      case DateTokens.MONTH:
        month = dateArr[i];
        break;

      case DateTokens.DAY:
        day = dateArr[i];
        break;
    }
  }

  for (const format of toFormat) {
    switch (format) {
      case DateTokens.FULL_YEAR:
        result.push(year);
        break;

      case DateTokens.SHORT_YEAR:
        result.push(year.slice(2));
        break;

      case DateTokens.MONTH:
        result.push(month);
        break;

      case DateTokens.DAY:
        result.push(day);
        break;
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
