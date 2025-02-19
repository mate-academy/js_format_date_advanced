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

  const dateInOldFormatArr = date.split(oldSeparator);
  const dateInNewFormatArr = [];

  const month = dateInOldFormatArr[fromFormat.indexOf('MM')];
  const day = dateInOldFormatArr[fromFormat.indexOf('DD')];
  let year;

  if (date.length === 10) {
    year = dateInOldFormatArr[fromFormat.indexOf('YYYY')];
    year = `${year[2]}${year[3]}`;
  } else if (date.length === 8) {
    year = dateInOldFormatArr[fromFormat.indexOf('YY')];
  }

  for (const ch of toFormat) {
    if (ch.includes('M')) {
      dateInNewFormatArr.push(month);
    }

    if (ch.includes('D')) {
      dateInNewFormatArr.push(day);
    }

    if (ch.includes('YYYY') && year < 30) {
      year = '20' + year;
      dateInNewFormatArr.push(year);
    } else if (ch.includes('YYYY') && year > 30) {
      year = '19' + year;
      dateInNewFormatArr.push(year);
    } else if (ch.includes('Y')) {
      dateInNewFormatArr.push(year);
    }
  }

  const dateInNewFormat = dateInNewFormatArr.join(newSeparator);

  return dateInNewFormat;
}

module.exports = formatDate;
