'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const seperatorOld = fromFormat.at(-1);

  const seperatorNew = toFormat.at(-1);

  const dateArrayOld = date.split(seperatorOld);

  const dateObjectOld = {};

  const dateObjectOldKeys = {};

  const dateObjectNew = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateObjectOld[fromFormat[i]] = dateArrayOld[i]; // {YYYY: 2020}

    dateObjectOldKeys[dateArrayOld[i]] = fromFormat[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    /*
      4 Möglichkeiten:

        YY kann YY && YYYY = YYYY === true,

        YY kann YYYY && YYYY kann YY === undefined

    */
    const getYearFormat = () => {
      return dateObjectOld['YYYY'] || dateObjectOld['YY'];
    };

    const oldPart = ['YY', 'YYYY'].includes(toFormat[i])
      ? getYearFormat()
      : dateObjectOld[toFormat[i]];

    const oldPartKey = dateObjectOldKeys[oldPart];

    const part = toFormat[i];

    let newPart = '';

    switch (oldPartKey) {
      case 'YYYY':
        newPart = part === 'YY' ? `${oldPart[2]}${oldPart[3]}` : oldPart;
        break;
      case 'YY':
        newPart =
          part === 'YYYY'
            ? oldPart < 30
              ? `20${oldPart}`
              : `19${oldPart}`
            : oldPart;
        break;
      default:
        newPart = oldPart;
    }

    dateObjectNew[toFormat[i]] = newPart;
  }

  return Object.values(dateObjectNew)
    .filter((val) => val !== undefined)
    .reduce((str, val, i, ar) => {
      const stri =
        val +
        (() => {
          return i === 2 ? '' : seperatorNew;
        })();

      return str + stri;
    }, '');
}

module.exports = formatDate;
