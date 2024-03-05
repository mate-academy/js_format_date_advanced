"use strict";

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
	@@ -42,15 +42,59 @@
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 */



function formatDate(date, fromFormat, toFormat) {
  const separator1 = fromFormat[fromFormat.length - 1];
  const dateElements = date.split(separator1);

  const matcher = {};

  for (let index = 0; index < dateElements.length; index++) {
    matcher[fromFormat[index]] = dateElements[index];
  }

  let { YYYY, MM, DD, YY } = matcher;

  if (YYYY === undefined) {
    if (YY > 24) {
      YYYY = Number("19" + String(YY));
    } else {
      YYYY = Number("20" + String(YY));
    }
  }

  if (YY === undefined) {
    YY = YYYY.slice(2);
  }

  const newDateElements = [];

  const separator2 = toFormat[toFormat.length - 1];

  for (let index = 0; index < toFormat.length - 1; index++) {
    if (toFormat[index] === "YYYY") {
      newDateElements.push(YYYY);
    }

    if (toFormat[index] === "YY") {
      newDateElements.push(YY);
    }

    if (toFormat[index] === "MM") {
      newDateElements.push(MM);
    }

    if (toFormat[index] === "DD") {
      newDateElements.push(DD);
    }
  }

  const result = newDateElements.join(separator2);

  return result;
}

module.exports = formatDate;
