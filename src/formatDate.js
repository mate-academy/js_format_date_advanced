'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateSplit = date.split(fromFormat[3]);
  const dateInNewFormatArray = [];
  const copyOfToFormat = [...toFormat];
  const newDateSeparator = copyOfToFormat.pop();

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('YY')) {
      const yearSliced = dateSplit[i].slice(dateSplit[i].length - 2);

      if (fromFormat[i] === 'YY') {
        dateObject.YYYY = Number(yearSliced) < 30
          ? `20${yearSliced}`
          : `19${yearSliced}`;
      } else {
        dateObject.YY = yearSliced;
      }
    }
    dateObject[fromFormat[i]] = dateSplit[i];
  }

  for (const datePart of copyOfToFormat) {
    dateInNewFormatArray.push(dateObject[datePart]);
  }

  return dateInNewFormatArray.join(newDateSeparator);
}

module.exports = formatDate;
