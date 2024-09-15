'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateArr = date.split(separatorFrom);
  const dateObjFrom = {};
  const newDateArr = [];
  const yearTwoDigitsFormat = 'YY';
  const yearFourDigitsFormat = 'YYYY';
  const month = 'MM';
  const day = 'DD';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObjFrom[fromFormat[i]] = dateArr[i];
  }

  for (const formatPart of toFormat) {
    switch (formatPart) {
      case yearTwoDigitsFormat:
        const yearShort = dateObjFrom[yearFourDigitsFormat] % 100;

        newDateArr.push(yearShort < 10 ? `0${yearShort}` : `${yearShort}`);
        break;
      case yearFourDigitsFormat:
        let yearLong = dateObjFrom[yearTwoDigitsFormat];

        if (yearLong) {
          yearLong = Number(yearLong) < 30 ? `20${yearLong}` : `19${yearLong}`;
        } else {
          yearLong = dateObjFrom[yearFourDigitsFormat];
        }
        newDateArr.push(yearLong);
        break;
      case month:
        newDateArr.push(dateObjFrom[month]);
        break;
      case day:
        newDateArr.push(dateObjFrom[day]);
        break;
    }
  }

  return newDateArr.join(separatorTo);
}

module.exports = formatDate;
