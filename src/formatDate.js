'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const originalSeparator = fromFormat.pop();
  const partsOriginalDate = date.split(originalSeparator);
  const finalDate = [];

  for (const datePart of fromFormat) {
    let finalPosYear;

    switch (datePart) {
      case 'YYYY':
        const isShortFormat = toFormat.indexOf('YY') !== -1;
        const startPosYear = fromFormat.indexOf(datePart);

        if (isShortFormat) {
          finalPosYear = toFormat.indexOf('YY');
          finalDate[finalPosYear] = partsOriginalDate[startPosYear].slice(-2);
        } else {
          finalPosYear = toFormat.indexOf(datePart);
          finalDate[finalPosYear] = partsOriginalDate[startPosYear];
        }
        break;

      case 'YY':
        const isLongFormat = toFormat.indexOf('YYYY') !== -1;
        const startPosShortYear = fromFormat.indexOf(datePart);

        if (isLongFormat) {
          finalPosYear = toFormat.indexOf('YYYY');

          if (partsOriginalDate[startPosShortYear] < 30) {
            finalDate[finalPosYear] =
              `20${partsOriginalDate[startPosShortYear]}`;
          } else {
            finalDate[finalPosYear] =
              `19${partsOriginalDate[startPosShortYear]}`;
          }
        } else {
          finalPosYear = toFormat.indexOf(datePart);
          finalDate[finalPosYear] = partsOriginalDate[startPosYear];
        }
        break;

      case 'MM':
      case 'DD':
        const start = fromFormat.indexOf(datePart);
        const final = toFormat.indexOf(datePart);

        finalDate[final] = partsOriginalDate[start];
        break;

      default:
        throw new Error(`Undefined format: ${datePart}`);
    }
  }

  const finalSeparator = toFormat.pop();

  return finalDate.join(finalSeparator);
}

module.exports = formatDate;
