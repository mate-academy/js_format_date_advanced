'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fYear, fMonth, fDay, fromSeparator] = fromFormat;
  const [tYear, tMonth, tDay, toSeparator] = toFormat;

  const parts = date.split(fromSeparator);

  const map = {
    [fYear]: parts[0],
    [fMonth]: parts[1],
    [fDay]: parts[2],
  };

  let year = map['YYYY'] || map['YY'];
  const month = map['MM'];
  const day = map['DD'];

  if (fYear === 'YYYY' && tYear === 'YY') {
    year = year.slice(-2);
  }

  if (fYear === 'YY' && tYear === 'YYYY') {
    const num = Number(year);

    year = num < 30 ? `20${year}` : `19${year}`;
  }

  const resultMap = {
    YYYY: year,
    YY: year.slice(-2),
    MM: month,
    DD: day,
  };

  return [resultMap[tYear], resultMap[tMonth], resultMap[tDay]].join(
    toSeparator,
  );
}

module.exports = formatDate;
