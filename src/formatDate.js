'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [unitOne, unitTwo, unitThree, separator] = fromFormat;
  const [a, b, c] = date.split(separator);
  const [, , , finalSeparator] = toFormat;

  const fromFormatObject = {
    firstUnit: [unitOne, a],
    secondUnit: [unitTwo, b],
    thirdUnit: [unitThree, c],
  };

  for (const unitOfTime of toFormat) {
    if (unitOfTime.startsWith('Y')) {
      for (const key in fromFormatObject) {
        if (fromFormatObject[key].includes('YY')
        || fromFormatObject[key].includes('YYYY')) {
          fromFormatObject[key].push(unitOfTime);
        }
      }
    }

    if (unitOfTime.startsWith('M')) {
      for (const key in fromFormatObject) {
        if (fromFormatObject[key].includes('MM')) {
          fromFormatObject[key].push(unitOfTime);
        }
      }
    }

    if (unitOfTime.startsWith('D')) {
      for (const key in fromFormatObject) {
        if (fromFormatObject[key].includes('DD')) {
          fromFormatObject[key].push(unitOfTime);
        }
      }
    }
  }

  for (const item in fromFormatObject) {
    let [fromStr, fromYear, toStr] = fromFormatObject[item]; // eslint-disable-line
    const fLength = fromStr.length;
    const tLength = toStr.length;

    if (fromStr.startsWith('Y')
      && toStr.length === 4
      && fromYear >= 30
      && fLength !== tLength) {
      fromStr = fromStr.padStart(4, 'Y');
      fromYear = fromYear.padStart(4, '19');
    }

    if (fromStr.startsWith('Y')
    && toStr.length === 2
    && fromYear <= 30
    && fLength !== tLength) {
      fromStr = fromStr.slice(0, 2);
      fromYear = fromYear.slice(2);
    }

    if (fromStr.startsWith('Y')
    && toStr.length === 2
    && fromYear > 30
    && fLength !== tLength) {
      fromStr = fromStr.slice(0, 2);
      fromYear = fromYear.slice(2);
    }

    if (fromStr.startsWith('Y')
    && toStr.length === 4
    && fromYear < 30
    && fLength !== tLength) {
      fromStr = fromStr.padStart(4, 'Y');
      fromYear = fromYear.padStart(4, '20');
    }

    fromFormatObject[item] = [fromStr, fromYear, toStr];
  }

  const comparedObject = {
    first: [toFormat.indexOf(fromFormatObject.firstUnit[0]),
      fromFormatObject.firstUnit[1]],
    second: [toFormat.indexOf(fromFormatObject.secondUnit[0]),
      fromFormatObject.secondUnit[1]],
    third: [toFormat.indexOf(fromFormatObject.thirdUnit[0]),
      fromFormatObject.thirdUnit[1]],
  };

  const calculatedValues = {
    firstCorrectedUnit: null,
    secondCorrectedUnit: null,
    thirdCorrectedUnit: null,
  };

  for (const key in comparedObject) {
    const [temp, value] = comparedObject[key];

    if (temp === 0) {
      calculatedValues.firstCorrectedUnit = value;
    }

    if (temp === 1) {
      calculatedValues.secondCorrectedUnit = value;
    }

    if (temp === 2) {
      calculatedValues.thirdCorrectedUnit = value;
    }
  }

  return `${calculatedValues.firstCorrectedUnit}${finalSeparator}${calculatedValues.secondCorrectedUnit}${finalSeparator}${calculatedValues.thirdCorrectedUnit}`;
}

module.exports = formatDate;
