'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.slice(-1);
  const newSeparator = toFormat.slice(-1);
  const oldDate = date.split(oldSeparator);
  let newFormatDate = [];
  let dateIndex = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let f = 0; f < fromFormat.length - 1; f++) {
      if (fromFormat[f] === toFormat[i]) {
        dateIndex = fromFormat.indexOf(fromFormat[f]);

        newFormatDate.push(oldDate.slice(dateIndex, dateIndex + 1));

        if (newFormatDate.length === 3) {
          newFormatDate = newFormatDate.join(newSeparator);

          return newFormatDate;
        }
      }
    }
  }

  let formatYear = '';

  if (toFormat.indexOf('YY') === 2) {
    dateIndex = fromFormat.indexOf('YYYY');
    formatYear = oldDate.slice(dateIndex, dateIndex + 1);
    formatYear = formatYear.join().slice(2);
    newFormatDate.push(formatYear);
  } else if (toFormat.indexOf('YYYY') === 0) {
    dateIndex = fromFormat.indexOf('YY');
    formatYear = oldDate.slice(dateIndex, dateIndex + 1);

    if (formatYear < 30) {
      formatYear.unshift('20');
      formatYear = formatYear.join('');
      newFormatDate.unshift(formatYear);
    } else if (formatYear >= 30) {
      formatYear.unshift('19');
      formatYear = formatYear.join('');
      newFormatDate.unshift(formatYear);
    }
  }

  newFormatDate = newFormatDate.join(newSeparator);

  return newFormatDate;
}

module.exports = formatDate;
