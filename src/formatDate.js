'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newFormatArr = [];
  const [, , , separatorTo] = toFormat;
  const [, , , separatorFrom] = fromFormat;
  const separateDate = date.split(separatorFrom);

  const objFrom = {};
  const objTo = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objFrom[fromFormat[i]] = i;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    objTo[toFormat[i]] = i;

    if (objFrom[fromFormat[i]] === objTo[toFormat[i]]) {
      newFormatArr[objTo[toFormat[i]]] = separateDate[objFrom[toFormat[i]]];
    }

    const isFullYear =
      objFrom.hasOwnProperty('YY') && objTo.hasOwnProperty('YYYY');

    if (isFullYear) {
      const yyIndexFrom = fromFormat.indexOf('YY');
      const yyyyIndexTo = toFormat.indexOf('YYYY');

      if (separateDate[fromFormat.indexOf('YY')] < 30) {
        newFormatArr[yyyyIndexTo] = '20' + separateDate[yyIndexFrom];
      } else {
        newFormatArr[yyyyIndexTo] = '19' + separateDate[yyIndexFrom];
      }
    }

    const isShortYear =
      objFrom.hasOwnProperty('YYYY') && objTo.hasOwnProperty('YY');

    if (isShortYear) {
      const yyyyIndexFrom = fromFormat.indexOf('YYYY');
      const yyIndexTo = toFormat.indexOf('YY');

      newFormatArr[yyIndexTo] = separateDate[yyyyIndexFrom].slice(-2);
    }
  }

  const newFormatResult = newFormatArr.join(separatorTo);

  return newFormatResult;
}

module.exports = formatDate;
