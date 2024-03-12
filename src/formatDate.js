'use strict';
 /**
 *   Time flies, standards change. Let's get rid of the routine of changing the
@@ -42,15 +42,59 @@
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

  function formatDate(date, fromFormat, toFormat) {
    const currentDateArr = date.split(fromFormat[fromFormat.length - 1]);

    const getIndex = (arr, type) => arr.findIndex(el => el.includes(type));

    const oldYearFormatIndex = getIndex(fromFormat, 'Y')
    const newYearFormatIndex = getIndex(toFormat, 'Y')

    const oldMonthFormatIndex = getIndex(fromFormat, 'M')
    const newMonthFormatIndex = getIndex(toFormat, 'M')

    const oldDayFormatIndex = getIndex(fromFormat, 'D')
    const newDayFormatIndex = getIndex(toFormat, 'D')

    let year = currentDateArr[oldYearFormatIndex];

    if (fromFormat[oldYearFormatIndex].length > toFormat[newYearFormatIndex].length) {
        year = year.slice(-2)
    }   else if (fromFormat[oldYearFormatIndex].length < toFormat[newYearFormatIndex].length) {
        year = `${year < 30 ? 20 : 19}${year}`
     }
        const res = []

        res[newYearFormatIndex] = year
        res[newMonthFormatIndex] = currentDateArr[oldMonthFormatIndex]
        res[newDayFormatIndex] = currentDateArr[oldDayFormatIndex]

        return res.join(toFormat[toFormat.length -1])


    }


module.exports = formatDate;

   
