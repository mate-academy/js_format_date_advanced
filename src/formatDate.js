'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];
  const dateFromParts = date.split(fromFormatSeparator);
  const objFromFormat = {};
  const resultDate = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('D')) {
      objFromFormat.day = dateFromParts[i];
    } else if (fromFormat[i].includes('M')) {
      objFromFormat.month = dateFromParts[i];
    } else if (fromFormat[i].includes('Y')) {
      objFromFormat.year = {
        format: fromFormat[i],
        value: dateFromParts[i],
        get formatSize() {
          return fromFormat[i].length;
        },
      };
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].includes('M')) {
      resultDate.push(objFromFormat.month);
    } else if (toFormat[i].includes('D')) {
      resultDate.push(objFromFormat.day);
    } else if (toFormat[i].includes('Y')) {
      let newFormatYearValue = objFromFormat.year.value;

      if (toFormat[i].length !== objFromFormat.year.formatSize) {
        if (toFormat[i].length === 2) {
          newFormatYearValue = objFromFormat.year.value.slice(2, 4);
        } else if (toFormat[i].length === 4) {
          newFormatYearValue =
            (newFormatYearValue < 30 ? '20' : '19') + newFormatYearValue;
        }
      }
      resultDate.push(newFormatYearValue);
    }
  }

  return resultDate.join(toFormatSeparator);

  //   const formatingFrom = {};

  //   formatingFrom[fromFormat[0]] = dateFromParts[0];
  //   formatingFrom[fromFormat[1]] = dateFromParts[1];
  //   formatingFrom[fromFormat[2]] = dateFromParts[2];
  //   const dateToParts = [];

  //     for (const key in formatingFrom) {
  //   for (let i = 0; i < 3; i++) {
  //       if (key.includes(toFormat[i][0])) {
  //         const needLength = toFormat[i].length;
  //         const isLength = formatingFrom[key].length;
  //         let newPartDate = formatingFrom[key];

  //         if (isLength !== needLength && key.includes('Y')) {
  //           if (needLength === 2) {
  //             newPartDate = formatingFrom[key].slice(2, 4);
  //           } else {
  //             newPartDate = (newPartDate < 30 ? '20' : '19') + newPartDate;
  //           }
  //         }
  //         dateToParts.push(newPartDate);
  //       }
  //     }
  //   }

  //   return dateToParts.join(toFormatSeparator);
  // }
}

module.exports = formatDate;
