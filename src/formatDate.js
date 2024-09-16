'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CENTURE_XXI = '20';
  const CENTURE_XX = '19';
  let year = '';
  let month = '';
  let day = '';
  const dateValuesNew = [];

  const separatorOld = fromFormat[fromFormat.length - 1];
  const separatorNew = toFormat[toFormat.length - 1];

  const dateValuesOld = date.split(separatorOld);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const part = fromFormat[i];

    switch (part) {
      case 'YY':
      case 'YYYY':
        year = dateValuesOld[i];
        break;
      case 'MM':
        month = dateValuesOld[i];
        break;
      case 'DD':
        day = dateValuesOld[i];
        break;
      default:
        return `Unknown date format ${part}`;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const part = toFormat[i];
    let changeYear = year;

    switch (part) {
      case 'YYYY':
        if (year.length === 2) {
          changeYear = year < 30
            ? `${CENTURE_XXI}${year}`
            : `${CENTURE_XX}${year}`;
        }
        dateValuesNew.push(changeYear);
        break;
      case 'YY':
        dateValuesNew.push(year.substring(2));
        break;
      case 'MM':
        dateValuesNew.push(month);
        break;
      case 'DD':
        dateValuesNew.push(day);
        break;
      default:
        return `Unknown date format ${part}`;
    }
  }

  return dateValuesNew.join(separatorNew);
}

module.exports = formatDate;
