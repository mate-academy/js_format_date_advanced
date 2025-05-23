'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const splittedFromDate = date.split(fromSeparator);

  let fromYear = 0;
  let fromMonth = 0;
  let fromDay = 0;
  let fromYearFormat = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      fromYear = splittedFromDate[i];
      fromYearFormat = fromFormat[i];
    } else if (fromFormat[i] === 'MM') {
      fromMonth = splittedFromDate[i];
    } else if (fromFormat[i] === 'DD') {
      fromDay = splittedFromDate[i];
    }
  }

  let toYear = 0;
  const toDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      if (fromYearFormat === 'YYYY') {
        toYear = fromYear;
      } else if (fromYearFormat === 'YY' && Number(fromYear) < 30) {
        toYear = Number('20' + fromYear);
      } else {
        toYear = Number('19' + fromYear);
      }
      toDateArr.push(toYear);
    } else if (toFormat[i] === 'YY') {
      if (fromYearFormat === 'YY') {
        toYear = fromYear;
      } else {
        toYear = String(fromYear % 100).padStart(2, '0');
      }
      toDateArr.push(toYear);
    } else if (toFormat[i] === 'MM') {
      toDateArr.push(fromMonth);
    } else if (toFormat[i] === 'DD') {
      toDateArr.push(fromDay);
    }
  }

  return toDateArr.join(toSeparator);
}

module.exports = formatDate;
