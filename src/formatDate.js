'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

// formatDate(
//   '2020-02-18',
//   ['YYYY', 'MM', 'DD', '-'],
//   ['YYYY', 'MM', 'DD', '.'],
// ); // '2020.02.18'

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const parts = date.split(separatorFrom);

  if (parts.length !== 3) {
    return null;
  }

  const mapDate = {
    [fromFormat[0]]: parts[0],
    [fromFormat[1]]: parts[1],
    [fromFormat[2]]: parts[2],
  };

  // Допоміжні функції для перетворення року
  const expandYYtoYYYY = (yyStr) => {
    // гарантуємо, що yyStr має 2 символи
    const yy = String(yyStr).padStart(2, '0');
    const n = Number(yy);

    return (n < 30 ? '20' : '19') + yy;
  };

  const shrinkYYYYtoYY = (yyyyStr) => {
    const yyyy = String(yyyyStr);

    return yyyy.slice(-2);
  };

  const normDDMM = (s) => String(s).padStart(2, '0');

  const resultParts = [];

  for (const key of toFormat.slice(0, 3)) {
    if (key === 'DD' || key === 'MM') {
      const val =
        mapDate[key] !== undefined
          ? mapDate[key]
          : mapDate[key] === undefined
            ? undefined
            : mapDate[key];

      if (val === undefined) {
        return null;
      }
      resultParts.push(normDDMM(val));
    } else if (key === 'YYYY') {
      if (mapDate['YYYY'] !== undefined) {
        resultParts.push(String(mapDate['YYYY']));
      } else if (mapDate['YY'] !== undefined) {
        resultParts.push(expandYYtoYYYY(mapDate['YY']));
      } else {
        return null;
      }
    } else if (key === 'YY') {
      if (mapDate['YY'] !== undefined) {
        resultParts.push(String(mapDate['YY']).padStart(2, '0'));
      } else if (mapDate['YYYY'] !== undefined) {
        resultParts.push(shrinkYYYYtoYY(mapDate['YYYY']));
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
