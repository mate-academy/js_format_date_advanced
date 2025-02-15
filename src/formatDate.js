'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const OLD_FORMAT = fromFormat.slice(0, 3);
  const NEW_FORMAT = toFormat.slice(0, 3);
  const OLD_DIVIDER = fromFormat.at(-1);
  const NEW_DIVIDER = toFormat.at(-1);
  const DATE_PARTS = date.split(OLD_DIVIDER);

  let year = '';
  let month = '';
  let day = '';
  const newDateArray = [];

  for (let i = 0; i < DATE_PARTS.length; i++) {
    const isYear = OLD_FORMAT[i].includes('Y');
    const isMonth = OLD_FORMAT[i] === 'MM';
    const isDay = OLD_FORMAT[i] === 'DD';
    const datePart = DATE_PARTS[i];

    if (isYear) {
      year = datePart;
    }

    if (isMonth) {
      month = datePart;
    }

    if (isDay) {
      day = datePart;
    }
  }

  for (let i = 0; i < NEW_FORMAT.length; i++) {
    const isNewFullYear = NEW_FORMAT[i] === 'YYYY';
    const isNewPartYear = NEW_FORMAT[i] === 'YY';
    const isNewMonth = NEW_FORMAT[i] === 'MM';
    const isNewDay = NEW_FORMAT[i] === 'DD';

    if (isNewFullYear) {
      const lastDigitsOfYear = year.slice(-2);

      if (lastDigitsOfYear < 30) {
        newDateArray.push(`20${year.slice(-2)}`);
      } else {
        newDateArray.push(`19${year.slice(-2)}`);
      }
    }

    if (isNewPartYear) {
      newDateArray.push(year.slice(2));
    }

    if (isNewMonth) {
      newDateArray.push(month);
    }

    if (isNewDay) {
      newDateArray.push(day);
    }
  }

  const NEW_DATE = newDateArray.join(NEW_DIVIDER);

  return NEW_DATE;
}
module.exports = formatDate;
