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
  // const dataObject = {};
  // const [, , , sign] = fromFormat;
  // const [, , , newSign] = toFormat;

  // const splitDate = date.split(sign);
  // const newDate = [];

  // for (let i = 0; i <= 2; i++) {
  //   const key = fromFormat[i];
  //   const value = splitDate[i];

  //   dataObject[key] = value;
  // }

  // for (let i = 0; i <= 2; i++) {
  //   const targetKey = toFormat[i];

  //   if (targetKey in dataObject) {
  //     newDate.push(dataObject[targetKey]);
  //   } else if (targetKey === 'YY') {
  //     newDate.push(dataObject['YYYY'].slice(-2));
  //   } else if (targetKey === 'YYYY') {
  //     if (dataObject['YY'] < 30) {
  //       dataObject[targetKey] = '20' + dataObject['YY'];
  //     } else {
  //       dataObject[targetKey] = '19' + dataObject['YY'];
  //     }

  //     newDate.push(dataObject[targetKey]);
  //   }

  //   // if (targetKey === 'YY') {
  //   //   newDate.push(dataObject[targetKey].slice(-2));
  //   // } else if (targetKey === 'YYYY') {
  //   //   if (dataObject[targetKey] < 30) {
  //   //     dataObject[targetKey] = '20' + dataObject[targetKey];
  //   //   } else {
  //   //     dataObject[targetKey] = '19' + dataObject[targetKey];
  //   //   }

  //   //   newDate.push(dataObject[targetKey]);
  //   // } else {
  //   //   newDate.push(dataObject[targetKey]);
  //   // }
  // }

  // return newDate.join(newSign);

  const dataObject = {};
  const [, , , sign] = fromFormat;
  const [, , , newSign] = toFormat;
  const newDate = [];
  const splitDate = date.split(sign);

  for (let i = 0; i <= 2; i++) {
    const key = fromFormat[i];
    const value = splitDate[i];

    dataObject[key] = value;
  }

  for (let i = 0; i <= 2; i++) {
    const targetKey = toFormat[i];

    if (targetKey in dataObject) {
      newDate.push(dataObject[targetKey]);
    } else if (targetKey === 'YY') {
      newDate.push(dataObject['YYYY'].slice(-2));
    } else if (targetKey === 'YYYY') {
      if (dataObject['YY'] < 30) {
        dataObject[targetKey] = '20' + dataObject['YY'];
      } else {
        dataObject[targetKey] = '19' + dataObject['YY'];
      }

      newDate.push(dataObject[targetKey]);
    }
  }

  return newDate.join(newSign);
}

module.exports = formatDate;
