'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let fromSeparator;

  for (const char of date) {
    if (!(char >= '0' && char <= '9')) {
      fromSeparator = char;
      break;
    }
  }

  let cleanedDate = date.trim();

  if (cleanedDate.endsWith(fromSeparator)) {
    cleanedDate = cleanedDate.slice(0, -1);
  }

  const dateParts = cleanedDate
    .split(fromSeparator)
    .filter((part) => part !== '');

  const dateMap = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  let toSeparator = '';

  for (const item of toFormat) {
    if (!(item === 'YYYY' || item === 'YY' || item === 'MM' || item === 'DD')) {
      toSeparator = item;
      break;
    }
  }

  if (!toSeparator) {
    toSeparator = fromSeparator;
  }

  const formattedParts = toFormat
    .filter(
      (part) =>
        part === 'YYYY' || part === 'YY' || part === 'MM' || part === 'DD',
    )
    .map((part) => {
      if (part === 'YY' && dateMap['YYYY']) {
        return dateMap['YYYY'].slice(-2);
      } else if (part === 'YYYY' && dateMap['YY']) {
        const yy = parseInt(dateMap['YY'], 10);
        const prefix = yy < 30 ? '20' : '19';

        return prefix + dateMap['YY'];
      } else {
        return dateMap[part];
      }
    });

  return formattedParts.join(toSeparator);
}

module.exports = formatDate;
