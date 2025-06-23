'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, oldFormat, newFormat) {
  // write code here
  const separatorOld = oldFormat[3];
  const separatorNew = newFormat[3];

  let positionYearOld;
  let positionMonthOld;
  let positionDayOld;

  let positionYearNew;
  let positionMonthNew;
  let positionDayNew;

  const oldDateSplited = date.split(separatorOld);

  oldFormat.forEach((item, index) => {
    if (item === 'YYYY' || item === 'YY') {
      return (positionYearOld = index);
    }

    if (item === 'MM') {
      return (positionMonthOld = index);
    }

    if (item === 'DD') {
      return (positionDayOld = index);
    }
  });

  newFormat.forEach((item, index) => {
    if (item === 'YYYY' || item === 'YY') {
      const OLD_YEAR = oldDateSplited[positionYearOld];

      if (item === 'YYYY' && oldFormat[positionYearOld] === 'YY') {
        oldDateSplited[positionYearOld] =
          OLD_YEAR < 30 ? `20${OLD_YEAR}` : `19${OLD_YEAR}`;
      }

      if (item === 'YY' && oldFormat[positionYearOld] === 'YYYY') {
        const LAST_CHAR = OLD_YEAR.charAt(OLD_YEAR.length - 1);
        const PENULT_CHAR = OLD_YEAR.charAt(OLD_YEAR.length - 2);

        oldDateSplited[positionYearOld] = `${PENULT_CHAR}${LAST_CHAR}`;
      }

      return (positionYearNew = index);
    }

    if (item === 'YYYY' || item === 'YY') {
      return (positionYearNew = index);
    }

    if (item === 'MM') {
      return (positionMonthNew = index);
    }

    if (item === 'DD') {
      return (positionDayNew = index);
    }
  });

  let dateFormated = '';

  switch (newFormat[0]) {
    case 'DD':
      dateFormated += `${oldDateSplited[positionDayOld]}${separatorNew}`;
      break;

    case 'MM':
      dateFormated += `${oldDateSplited[positionMonthOld]}${separatorNew}`;
      break;

    case 'YY':
      dateFormated += `${oldDateSplited[positionYearOld]}${separatorNew}`;
      break;

    case 'YYYY':
      dateFormated += `${oldDateSplited[positionYearOld]}${separatorNew}`;
      break;
  }

  switch (newFormat[1]) {
    case 'DD':
      dateFormated += `${oldDateSplited[positionDayOld]}${separatorNew}`;
      break;

    case 'MM':
      dateFormated += `${oldDateSplited[positionMonthOld]}${separatorNew}`;
      break;

    case 'YY':
      dateFormated += `${oldDateSplited[positionYearOld]}${separatorNew}`;
      break;

    case 'YYYY':
      dateFormated += `${oldDateSplited[positionYearOld]}${separatorNew}`;
      break;
  }

  switch (newFormat[2]) {
    case 'DD':
      dateFormated += `${oldDateSplited[positionDayOld]}`;
      break;

    case 'MM':
      dateFormated += `${oldDateSplited[positionMonthOld]}`;
      break;

    case 'YY':
      dateFormated += `${oldDateSplited[positionYearOld]}`;
      break;

    case 'YYYY':
      dateFormated += `${oldDateSplited[positionYearOld]}`;
      break;
  }

  return dateFormated;
}

module.exports = formatDate;
