'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const correctDate = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const newDate = date.split(oldSeparator);

  const day = newDate[fromFormat.indexOf('DD')];
  const month = newDate[fromFormat.indexOf('MM')];
  let year;

  if (fromFormat.includes('YYYY')) {
    year = newDate[fromFormat.indexOf('YYYY')];
  } else if (fromFormat.includes('YY')) {
    const shortYear = newDate[fromFormat.indexOf('YY')];

    if (shortYear > 20 && shortYear < 99) {
      year = `19${shortYear}`;
    } else {
      year = `20${shortYear}`;
    }
  }

  for (const key of toFormat) {
    switch (key) {
      case 'DD':
        correctDate.push(day);
        break;
      case 'MM':
        correctDate.push(month);
        break;
      case 'YYYY':
        correctDate.push(year);
        break;
      case 'YY':
        correctDate.push(year.substr(2, 4));
        break;
    };
  }

  return correctDate.join(newSeparator);
}

module.exports = formatDate;
