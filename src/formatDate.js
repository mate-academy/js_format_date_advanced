'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.pop();
  const dateArray = date.split(fromSeparator);
  const dateObject = {};

  fromFormat.forEach((formatPart, i) => {
    if (formatPart === 'YYYY') {
      dateObject.YY = dateArray[i].slice(2);
    }

    if (formatPart === 'YY') {
      if (dateArray[i] < 30) {
        dateObject.YYYY = `20${dateArray[i]}`;

        return;
      }
      dateObject.YYYY = `19${dateArray[i]}`;
    }

    dateObject[formatPart] = dateArray[i];
  });

  const toSeparator = toFormat.pop();
  const formattedDateArr = [];

  toFormat.forEach((formatPart, i) => {
    formattedDateArr[i] = dateObject[formatPart];
  });

  return formattedDateArr.join(toSeparator);
}

module.exports = formatDate;
