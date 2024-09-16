'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateAfterFormatting = [];

  const PEAK_YEAR_IN_TWENTY_FIRST = 30;
  const TWENTY_FIRST_CENTURY = '20';
  const TWENTIETH_CENTURY = '19';
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateComponent = date.split(oldSeparator);

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('DD')];
        break;

      case 'MM':
        dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('MM')];
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          dateAfterFormatting[i] = dateComponent[fromFormat.indexOf('YY')];
        } else {
          dateAfterFormatting[i]
        = dateComponent[fromFormat.indexOf('YYYY')].split('').slice(2).join('');
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          dateAfterFormatting[i] = dateComponent[fromFormat.indexOf('YYYY')];
        } else {
          if (
            dateComponent[fromFormat.indexOf('YY')] >= PEAK_YEAR_IN_TWENTY_FIRST
          ) {
            dateAfterFormatting[i]
            = TWENTIETH_CENTURY + dateComponent[fromFormat.indexOf('YY')];
          }

          if (
            dateComponent[fromFormat.indexOf('YY')] < PEAK_YEAR_IN_TWENTY_FIRST
          ) {
            dateAfterFormatting[i]
            = TWENTY_FIRST_CENTURY + dateComponent[fromFormat.indexOf('YY')];
          }
        }
    }
  }

  return dateAfterFormatting.join(newSeparator);
}

module.exports = formatDate;
