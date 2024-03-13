'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateNew = date.split(separatorFrom);
  const needReverse = fromFormat.indexOf('DD') !== toFormat.indexOf('DD');
  const yearStart = fromFormat.includes('YY')
    ? 'YY'
    : 'YYYY';
  const yearEnd = toFormat.includes('YY')
    ? 'YY'
    : 'YYYY';
  const yearPosition = fromFormat.indexOf(yearStart);

  if (yearStart !== yearEnd) {
    dateNew[yearPosition] = changeYear(dateNew[yearPosition]);
  }

  if (needReverse) {
    dateNew.reverse();
  }

  return dateNew.join(separatorTo);
}

function changeYear(year) {
  if (year.length === 2) {
    const addNumber = +year < 30 ? '20' : '19';

    return addNumber + year;
  } else {
    return year.slice(2);
  }
}

module.exports = formatDate;
