'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldFormat = date.split(fromFormat[3]).reduce(
    (result, item, index) => ({
      ...result,
      [fromFormat[index]]: item,
    }),
    {},
  );

  return toFormat
    .slice(0, -1)
    .reduce((result, key, index) => {
      result.push(
        oldFormat[key] !== undefined
          ? oldFormat[key]
          : key === 'YY'
            ? oldFormat.YYYY.slice(2)
            : oldFormat.YY < 30
              ? '20' + oldFormat.YY
              : '19' + oldFormat.YY,
      );

      return result;
    }, [])
    .join(toFormat[3]);
}

module.exports = formatDate;
