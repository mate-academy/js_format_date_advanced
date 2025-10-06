'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);

  const get = (type) => {
    const i = fromFormat.indexOf(type);

    return parts[i];
  };

  const convert = (type) => {
    if (type === 'YY') {
      const year = get('YYYY');

      return year ? year.slice(-2) : get('YY');
    }

    if (type === 'YYYY') {
      const year = get('YY');

      if (!year) {
        return get('YYYY');
      }

      const num = parseInt(year, 10);

      return num < 30 ? '20' + year : '19' + year;
    }

    return get(type);
  };

  return [
    convert(toFormat[0]),
    convert(toFormat[1]),
    convert(toFormat[2]),
  ].join(toFormat[3]);
}

module.exports = formatDate;
