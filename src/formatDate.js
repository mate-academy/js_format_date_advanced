'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const splitDate = date.split(oldSeparator);

  const values = {};

  fromFormat.slice(0, 3).forEach((unit, index) => {
    values[unit] = splitDate[index];
  });

  const getYear = (targetFormat) => {
    const rawYear = values['YYYY'] || values['YY'];

    if (targetFormat === 'YYYY' && rawYear.length === 2) {
      const yearNum = parseInt(rawYear, 10);

      return yearNum < 30 ? `20${rawYear}` : `19${rawYear}`;
    }

    if (targetFormat === 'YY' && rawYear.length === 4) {
      return rawYear.slice(-2);
    }

    return rawYear;
  };

  return toFormat
    .slice(0, 3)
    .map((unit) => {
      if (unit === 'DD') {
        return values['DD'];
      }

      if (unit === 'MM') {
        return values['MM'];
      }

      return getYear(unit);
    })
    .join(newSeparator);
}

module.exports = formatDate;
