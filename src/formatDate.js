"use strict";

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const part = date.split(fromFormat[3]);

  const datePartsMap = {};

  for (let i = 0; i < 3; i++) {
    const formatKey = fromFormat[i];
    const formatValue = part[i];

    datePartsMap[formatKey] = formatValue;
  }

  const standardizedParts = {};

  for (const formatKey in datePartsMap) {
    const value = datePartsMap[formatKey];
    let type = "";

    if (formatKey.includes("Y")) {
      type = "year";
    } else if (formatKey.includes("M")) {
      type = "month";
    } else if (formatKey.includes("D")) {
      type = "day";
    }

    standardizedParts[type] = value;
  }

  function convertYear(yearValue, targetFormat) {
    if (yearValue.length === targetFormat.length) {
      return yearValue;
    }

    if (targetFormat === "YY") {
      return yearValue.slice(-2);
    } else if (targetFormat === "YYYY") {
      const yearNumber = Number(yearValue);

      if (yearNumber < 30) {
        return String(2000 + yearNumber);
      } else {
        return String(1900 + yearNumber);
      }
    }

    return yearValue;
  }

  const finalParts = [];
  const separator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    const targetFormat = toFormat[i];
    let type;

    if (targetFormat.includes("Y")) {
      type = "year";
    } else if (targetFormat.includes("M")) {
      type = "month";
    } else if (targetFormat.includes("D")) {
      type = "day";
    }

    const originalValue = standardizedParts[type];
    let formattedValue;

    if (type === "year") {
      formattedValue = convertYear(originalValue, targetFormat);
    } else {
      formattedValue = originalValue;
    }

    finalParts.push(formattedValue);
  }

  return finalParts.join(separator);
}

module.exports = formatDate;
