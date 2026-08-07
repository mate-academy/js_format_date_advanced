'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function yearFormat(numberYear, format) {
  const stringYear = String(numberYear);

  switch (format) {
    case 'YYYY':
      if (stringYear.length === 2) {
        if (numberYear >= 30) {
          return `19${stringYear}`;
        }

        return `20${stringYear}`;
      }

      return stringYear;

    case 'YY':
      if (stringYear.length === 4) {
        return `${stringYear.slice(2, 4)}`;
      }

      return stringYear;

    default:
      return stringYear;
  }
}

function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const formattedDate = [];

  formattedDate.length = 3;

  if (toFormat.indexOf('YY') !== -1) {
    if (fromFormat.indexOf('YY') !== -1) {
      formattedDate[toFormat.indexOf('YY')] =
        splitDate[fromFormat.indexOf('YY')];
    }

    if (fromFormat.indexOf('YYYY') !== -1) {
      formattedDate[toFormat.indexOf('YY')] = yearFormat(
        splitDate[fromFormat.indexOf('YYYY')],
        'YY',
      );
    }
  }

  if (toFormat.indexOf('YYYY') !== -1) {
    if (fromFormat.indexOf('YYYY') !== -1) {
      formattedDate[toFormat.indexOf('YYYY')] =
        splitDate[fromFormat.indexOf('YYYY')];
    }

    if (fromFormat.indexOf('YY') !== -1) {
      formattedDate[toFormat.indexOf('YYYY')] = yearFormat(
        splitDate[fromFormat.indexOf('YY')],
        'YYYY',
      );
    }
  }

  formattedDate[toFormat.indexOf('MM')] = splitDate[fromFormat.indexOf('MM')];
  formattedDate[toFormat.indexOf('DD')] = splitDate[fromFormat.indexOf('DD')];

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
