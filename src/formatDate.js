'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInfo = date.split(fromFormat[3]);
  const formatedDate = [];
  const separator = toFormat[3];

  fromFormat.pop();
  toFormat.pop();

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    fromFormat[fromFormat.indexOf('YYYY')] = 'YY';

    dateInfo[fromFormat.indexOf('YY')]
    = dateInfo[fromFormat.indexOf('YY')].slice(2);
  } else if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    fromFormat[fromFormat.indexOf('YY')] = 'YYYY';

    let year = dateInfo[fromFormat.indexOf('YYYY')];

    if (+year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }

    dateInfo[fromFormat.indexOf('YYYY')] = year;
  }

  for (let i = 0; i < toFormat.length; i++) {
    const index = fromFormat.indexOf(toFormat[i]);

    formatedDate[i] = dateInfo[index];
  }

  return formatedDate.join(separator);
}

module.exports = formatDate;
