'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formattedDate = [];

  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);

  const splittedDate = date.split(fromSeparator);

  for (let i = 0; i < toFormat.length; i++) {
    const toValue = toFormat[i];
    const toChar = toValue.charAt(0);

    const fromIndex = fromFormat.findIndex((val) => val.includes(toChar));
    const fromValue = fromFormat[fromIndex];
    const dateValue = splittedDate[fromIndex];

    const isYear = toValue.includes('Y');

    if (isYear && fromValue !== toValue) {
      const SHORT_FORMAT = 'YY';

      if (toValue === SHORT_FORMAT) {
        formattedDate[i] = dateValue.slice(2, 4);
      } else {
        formattedDate[i] =
          dateValue >= 30 ? `19${dateValue}` : `20${dateValue}`;
      }

      continue;
    }

    if (dateValue) {
      formattedDate[i] = dateValue;
    }
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
