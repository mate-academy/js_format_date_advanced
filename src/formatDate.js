'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_SEPARATOR_FORMAT = fromFormat[3];
  const TO_SEPARATOR_FORMAT = toFormat[3];
  let year, month, day;
  const RESULT = [];

  const ARRAY_FROM_DATE = date.split(FROM_SEPARATOR_FORMAT);

  fromFormat.forEach((part, i) => {
    switch (part) {
      case 'YYYY':
        year = ARRAY_FROM_DATE[i];
        break;

      case 'YY':
        year = ARRAY_FROM_DATE[i];
        break;

      case 'MM':
        month = ARRAY_FROM_DATE[i];
        break;

      case 'DD':
        day = ARRAY_FROM_DATE[i];
        break;

      default:
        break;
    }
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = year.slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    year = parseInt(year) < 30 ? '20' + year : '19' + year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      RESULT.push(year);
    }

    if (toFormat[i] === 'MM') {
      RESULT.push(month);
    }

    if (toFormat[i] === 'DD') {
      RESULT.push(day);
    }
  }

  const FINAL_RESULT = RESULT.join(TO_SEPARATOR_FORMAT);

  return FINAL_RESULT;
}

module.exports = formatDate;
