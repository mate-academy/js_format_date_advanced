'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [firstPart, secondPart, thirdPart] = date.split(fromFormat[3]);

  const formatedDates = [];

  const datePartWithDate = [
    [fromFormat[0], firstPart],
    [fromFormat[1], secondPart],
    [fromFormat[2], thirdPart],
  ];

  for (const [datePart, parsedDate] of datePartWithDate) {
    if (['YY', 'YYYY'].includes(datePart)) {
      const longDateFormatIndex = toFormat.indexOf('YYYY');
      const shortDateFormatIndex = toFormat.indexOf('YY');

      if (longDateFormatIndex !== -1) {
        formatedDates[longDateFormatIndex] = formatYear(parsedDate, 'YYYY');
      } else {
        formatedDates[shortDateFormatIndex] = formatYear(parsedDate, 'YY');
      }
    } else {
      formatedDates[toFormat.indexOf(datePart)] = parsedDate;
    }
  }

  return formatedDates.join(toFormat[3]);
}

function formatYear(date, format) {
  if (format === 'YYYY' && date.length === 2) {
    return `${date < 30 ? '20' : '19'}${date}`;
  } else if (format === 'YY' && date.length === 4) {
    return date.slice(2);
  }

  return date;
}

module.exports = formatDate;
