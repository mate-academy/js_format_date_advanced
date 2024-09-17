'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];

  const arrayDate = date.split(fromSeparator);

  let day = '';
  let month = '';
  let year = '';

  let index = 0;

  for (let i = 0; i < arrayDate.length; i++) {
    switch (fromFormat[index]) {
      case 'DD':
        day += arrayDate[i];
        break;

      case 'MM':
        month += arrayDate[i];
        break;

      case 'YYYY' || 'YY':
        year += arrayDate[i];
        break;

      case 'YY':
        year += arrayDate[i];
        break;
    }
    index++;
  }

  const separator = toFormat[3];
  const toFormatWithoutSeparator = toFormat.slice(0, 3);

  const formatedDate = [...toFormatWithoutSeparator];

  for (let i = 0; i < formatedDate.length; i++) {
    switch (formatedDate[i]) {
      case 'DD':
        formatedDate[i] = day;
        break;

      case 'MM':
        formatedDate[i] = month;
        break;

      case 'YY':
        if (year.length === 2) {
          formatedDate[i] = year;
        } else if (year.length === 4) {
          formatedDate[i] = year.split('').slice(2).join('');
        }
        break;

      case 'YYYY':
        if (year.length === 4) {
          formatedDate[i] = year;
        } else if (year.length === 2) {
          const startDecades = 30;
          const twentyThousands = 20;
          const ninetyThousands = 19;

          formatedDate[i]
          = year < startDecades
              ? year = `${twentyThousands}` + year
              : year = `${ninetyThousands}` + year;
        }
        break;
    }
  }

  return formatedDate.join(separator);
};

module.exports = formatDate;
