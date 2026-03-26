'use strict';

const shortYearLength = 2;
const longYearLength = 4;
const centuryDelimeter = 30;
const nineteenthCenturyMark = '19';
const twentiethCenturyMark = '20';
const twoLastDigitsOfYearSlicer = 2;

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 *  */
function formatDate(date, fromFormat, toFormat) {
  const indexYfirstArr = fromFormat.findIndex((item) => item.startsWith('Y'));
  const indexMfirstArr = fromFormat.findIndex((item) => item.startsWith('M'));
  const indexDfirstArr = fromFormat.findIndex((item) => item.startsWith('D'));
  const indexSepaFirstArr = 3;
  const lengthOfYearFieldFrom = fromFormat[indexYfirstArr].length;

  const indexYsecondArr = toFormat.findIndex((item) => item.startsWith('Y'));
  const indexMsecondArr = toFormat.findIndex((item) => item.startsWith('M'));
  const indexDsecondArr = toFormat.findIndex((item) => item.startsWith('D'));
  const indexSepaSecondArr = 3;
  const lengthOfYearFieldTo = toFormat[indexYsecondArr].length;

  const sourceDateArr = date.split(fromFormat[indexSepaFirstArr]);
  const year = sourceDateArr[indexYfirstArr];
  const month = sourceDateArr[indexMfirstArr];
  const day = sourceDateArr[indexDfirstArr];
  const newSeparator = toFormat[indexSepaSecondArr];

  const resultArray = [];

  const correctedYear = normalizeYear(
    year,
    lengthOfYearFieldFrom,
    lengthOfYearFieldTo,
  );

  resultArray[indexYsecondArr] = correctedYear;
  resultArray[indexMsecondArr] = month;
  resultArray[indexDsecondArr] = day;

  return resultArray.join(newSeparator);
}

module.exports = formatDate;

function normalizeYear(year, lengthOfYearFieldFrom, lengthOfYearFieldTo) {
  let correctedYear = year;

  if (lengthOfYearFieldFrom !== lengthOfYearFieldTo) {
    if (
      lengthOfYearFieldFrom === shortYearLength &&
      lengthOfYearFieldTo === longYearLength
    ) {
      if (year < centuryDelimeter) {
        correctedYear = twentiethCenturyMark + year;
      } else {
        correctedYear = nineteenthCenturyMark + year;
      }
    } else {
      correctedYear = year.slice(twoLastDigitsOfYearSlicer);
    }
  }

  return correctedYear;
}
