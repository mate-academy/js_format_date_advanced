'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const dateParts = date.split(oldSeparator);
  let newDate = '';
  const newDateParts = [];
  let yearFormatShort;
  let yearFormatLong;

  switch (true) {
    case toFormat.includes('YYYY') && fromFormat.includes('YY'):
      yearFormatShort = dateParts[fromFormat.indexOf('YY')];

      if (yearFormatShort > 29) {
        yearFormatLong = '19' + yearFormatShort;
      } else {
        yearFormatLong = '20' + yearFormatShort;
      }

      dateParts[dateParts.indexOf(yearFormatShort)] = yearFormatLong;
      fromFormat[fromFormat.indexOf('YY')] = 'YYYY';
      break;

    case toFormat.includes('YY') && fromFormat.includes('YYYY'):
      yearFormatLong = dateParts[fromFormat.indexOf('YYYY')];
      yearFormatShort = yearFormatLong.slice(2);

      fromFormat[fromFormat.indexOf('YYYY')] = 'YY';
      dateParts[dateParts.indexOf(yearFormatLong)] = yearFormatShort;
  }

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    const currentPart = fromFormat[i];
    const newIndex = toFormat.indexOf(currentPart);

    newDateParts[newIndex] = dateParts[i];
  }

  newDate = newDateParts.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
