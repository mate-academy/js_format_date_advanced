'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [from1, from2, from3, fromSeparator] = fromFormat;
  const [to1, to2, to3, toSeparator] = toFormat;

  const dateParts = date.split(fromSeparator);
  const parts = {
    [from1]: dateParts[0],
    [from2]: dateParts[1],
    [from3]: dateParts[2],
  };

  function convertYear(value, targetFormat) {
    if (targetFormat === 'YY') {
      return value.slice(-2);
    }

    if (targetFormat === 'YYYY') {
      if (value.length === 2) {
        const yearNum = parseInt(value, 10);

        return yearNum < 30 ? `20${value}` : `19${value}`;
      }

      return value;
    }

    return value;
  }

  function getPart(formatKey) {
    if (formatKey.startsWith('Y')) {
      const yearKey = [from1, from2, from3].find(
        (f) => f === 'YYYY' || f === 'YY',
      );

      return convertYear(parts[yearKey], formatKey);
    }

    return parts[formatKey];
  }

  return [getPart(to1), getPart(to2), getPart(to3)].join(toSeparator);
}

module.exports = formatDate;
