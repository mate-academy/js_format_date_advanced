'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const source = date.split(fromFormat[3]);
  let year = '';

  function insertYear(fromYear, toYear) {
    const fromIndexYear = fromFormat.indexOf(fromYear);
    const toIndexYear = toFormat.indexOf(toYear);

    newDate[toIndexYear] = source[fromIndexYear];
  }

  newDate[toFormat.indexOf('DD')] = source[fromFormat.indexOf('DD')];
  newDate[toFormat.indexOf('MM')] = source[fromFormat.indexOf('MM')];

  switch (true) {
    case (fromFormat.includes('YY') && toFormat.includes('YY')):
      insertYear('YY', 'YY');
      break;

    case (fromFormat.includes('YYYY') && toFormat.includes('YYYY')):
      insertYear('YYYY', 'YYYY');
      break;

    case (fromFormat.includes('YY') && toFormat.includes('YYYY')):
      insertYear('YY', 'YYYY');
      year = newDate[toFormat.indexOf('YYYY')];

      if (newDate[toFormat.indexOf('YYYY')] < 30) {
        newDate[toFormat.indexOf('YYYY')] = `20${year}`;
        break;
      }
      newDate[toFormat.indexOf('YYYY')] = `19${year}`;

      break;

    case (fromFormat.includes('YYYY') && toFormat.includes('YY')):
      insertYear('YYYY', 'YY');
      year = newDate[toFormat.indexOf('YY')];
      newDate[toFormat.indexOf('YY')] = year.slice(2);
      break;
    default:
      return;
  };

  return (newDate.join(toFormat[3]));
}

module.exports = formatDate;
