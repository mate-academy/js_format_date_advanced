'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sepfromFormat = fromFormat[fromFormat.length - 1];
  const septoFormat = toFormat[toFormat.length - 1];

  const parts = date.split(sepfromFormat);

  const ObjfromFormat = {};

  for (let k = 0; k < fromFormat.length - 1; k++) {
    ObjfromFormat[fromFormat[k]] = parts[k];
  }

  const arrtoFormat = [];

  for (let k = 0; k < toFormat.length - 1; k++) {
    if (toFormat[k] === 'DD' || toFormat[k] === 'MM') {
      arrtoFormat.push(ObjfromFormat[toFormat[k]]);
    }

    if (toFormat[k] === 'YY') {
      if (ObjfromFormat.YY) {
        arrtoFormat.push(ObjfromFormat.YY);
      } else {
        arrtoFormat.push(ObjfromFormat.YYYY.slice(-2));
      }
    }

    if (toFormat[k] === 'YYYY') {
      if (ObjfromFormat.YYYY) {
        arrtoFormat.push(ObjfromFormat.YYYY);
      } else {
        if (ObjfromFormat.YY < 30) {
          arrtoFormat.push('20' + ObjfromFormat.YY);
        } else {
          arrtoFormat.push('19' + ObjfromFormat.YY);
        }
      }
    }
  }

  let finalStr = arrtoFormat[0];

  for (let k = 1; k < toFormat.length - 1; k++) {
    finalStr = finalStr + septoFormat + arrtoFormat[k];
  }

  return finalStr;
}
module.exports = formatDate;
