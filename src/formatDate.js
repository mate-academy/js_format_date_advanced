'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const resultParts = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const part = fromFormat[i];

    switch (part) {
      case 'DD':
        day += dateParts[i];
        break;

      case 'MM':
        month += dateParts[i];
        break;

      default:
        year += dateParts[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];

    switch (part) {
      case 'DD':
        resultParts.push(day);
        break;

      case 'MM':
        resultParts.push(month);
        break;

      default:
        if (part.length === year.length) {
          resultParts.push(year);
          break;
        }

        if (year.length > part.length) {
          resultParts.push(year.slice(2));
          break;
        }

        if (+year < 30) {
          resultParts.push('20' + year);
          break;
        }

        resultParts.push('19' + year);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
