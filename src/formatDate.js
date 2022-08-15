'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
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
  // let res = '';
  const res2 = [];
  const wasFormat = fromFormat;
  const willFormat = toFormat;
  // нет смысла делать деструктуризацию объекта так как
  // местами переменные в мссиве могут менятся
  // надо по разделителю строку поделить так как
  // надо настроить цикл на определенное количество итераций
  // берем именно fromFormat так как у него разделитель как у date так как
  // это старая дата и ее старый формат
  const arrCurrentDate = date.split(wasFormat[3]);
  // console.log(arrCurrentDate);
  // каким то образом разделило все цифры между собой
  // наверное мы взяли разделитель
  // из массива fromFormat и выбрали его по индексу
  // 3й индекс то как раз разделитель
  // console.log(date.split(fromFormat[3]));

  // просто цикл не сработает так как в строке
  // date символом больше чем в переборе масива цикла
  for (let i = 0; i < wasFormat.length; i++) {
    if (wasFormat[i] !== willFormat[i] && willFormat[i] === 'DD') {
      res2.push(arrCurrentDate[2]);
      // console.log(wasFormat[i], willFormat[i]);
    }

    if (wasFormat[i] !== willFormat[i] && willFormat[i] === 'MM') {
      res2.push(arrCurrentDate[0]);
      // console.log(wasFormat[i], willFormat[i]);
    }

    if (wasFormat[i] !== willFormat[i] && willFormat[i] === 'YYYY') {
      res2.push(arrCurrentDate[1]);
      // console.log(wasFormat[i], willFormat[i]);
    }
    // console.log(object);
    // res += date[i]
  }

  return res2.join(willFormat[3]);
}

module.exports = formatDate;

// console.log(formatDate('12-2012-21',
// ['MM', 'YYYY', 'DD', '-'], ['DD', 'MM', 'YYYY', '-'])); // 21-12-2012

// const result = formatDate(
//   '12-2012-21',
//   ['MM', 'YYYY', 'DD', '-'],
//   ['DD', 'MM', 'YYYY', '-'],
// );

// expect(result)
//   .toBe('21-12-2012');
// });

// console.log(formatDate('2012-12-21',
// ['YYYY', 'MM', 'DD', '-'], ['YYYY', 'MM', 'DD', '.']));

// const result = formatDate(
//   '2012-12-21',
//   ['YYYY', 'MM', 'DD', '-'],
//   ['YYYY', 'MM', 'DD', '.'],
// );

// expect(result)
//   .toBe('2012.12.21');
// });
