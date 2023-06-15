let localeTime = '2023-05-19 00:00:11'; // 給當地時區的時間
let localeTimeObj = new Date(localeTime);

console.log(localeTimeObj); // Sun Jul 09 2017 00:00:00 GMT+0800 (CST)
console.log(localeTimeObj.toUTCString()); // 轉成 UTC（+0）的時間，Sat, 08 Jul 2017 16:00:00 GMT

console.log(localeTimeObj.toString()); // String Sun Jul 09 2017 00:00:00 GMT+0800 (CST)
console.log(localeTimeObj.toLocaleString()); // 2017-7-9 00:00:00
console.log(localeTimeObj.getSeconds())

const timestamp = new Date('2012-06-08').getTime()
console.log(Date('2012-06-08').getTime())
// console.log(timestamp / 1000)
// console.log(localeTimeObj.getTime() / 1000)