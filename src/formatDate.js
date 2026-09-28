'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [token1, token2, token3, separator1] = fromFormat;
  const fromDateArr = date.split(separator1);

  const currentDate = {
    [token1]: fromDateArr[0],
    [token2]: fromDateArr[1],
    [token3]: fromDateArr[2],
  };

  const [token1To, token2To, token3To, separator2] = toFormat;

  let yearFrom;
  let yearFromToken;

  if (token1 === 'YYYY' || token1 === 'YY') {
    yearFromToken = token1;
    yearFrom = currentDate[token1];
  } else if (token2 === 'YYYY' || token2 === 'YY') {
    yearFromToken = token2;
    yearFrom = currentDate[token2];
  } else if (token3 === 'YYYY' || token3 === 'YY') {
    yearFromToken = token3;
    yearFrom = currentDate[token3];
  }

  let yearTo;

  if (token1To === 'YYYY' || token1To === 'YY') {
    yearTo = token1To;
  } else if (token2To === 'YYYY' || token2To === 'YY') {
    yearTo = token2To;
  } else {
    yearTo = token3To;
  }

  if (yearFromToken === 'YYYY' && yearTo === 'YY') {
    currentDate[yearTo] = yearFrom.slice(-2);
  } else if (yearFromToken === 'YY' && yearTo === 'YYYY') {
    currentDate[yearTo] =
      Number(yearFrom) < 30 ? `20${yearFrom}` : `19${yearFrom}`;
  }

  const toDateArr = [
    currentDate[token1To],
    currentDate[token2To],
    currentDate[token3To],
  ];

  return toDateArr.join(separator2);
}

module.exports = formatDate;
