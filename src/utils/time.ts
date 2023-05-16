const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const fullDayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function get2Digits(date: number): string {
  if (date < 10) {
    return `0${date}`;
  }

  return date.toString();
}

function get12Hour(hour: number): string {
  if (hour > 12) {
    return (hour - 12).toString();
  }

  return hour.toString();
}

/**
 * 날짜 포맷대로 출력해주는 함수
 *
 * HH:mm => 00:12
 * hh:mm => 01:10
 * YYYY/MM/DD => 2023/05/16
 * M/D => 5/5
 * MM/DD => 05/16
 * ddd => Tue
 * dddd => Tuesday
 *
 * @param date
 * @param format
 * @returns
 */
function formatDate(date: number, format: string) {
  const dateObj = new Date(date);
  const hoursBy12 = get12Hour(dateObj.getHours());
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();
  const dayOfTheWeek = dateObj.getDay(); // 0~6 => Sun~Sat

  switch (format) {
    case "hh:mm":
      return `${get2Digits(parseInt(hoursBy12, 10))}:${get2Digits(minutes)}`;
    case "HH:mm":
      return `${get2Digits(hours + 1)}:${get2Digits(minutes)}`;
    case "YYYY/MM/DD":
      return `${year}/${get2Digits(month)}/${get2Digits(day)}`;
    case "YYYY/M/D":
      return `${year}/${month}/${day}`;
    case "MM/DD":
      return `${get2Digits(month)}/${get2Digits(day)}`;
    case "M/D":
      return `${month}`;
    case "ddd":
      return dayList[dayOfTheWeek];
    case "dddd":
      return fullDayList[dayOfTheWeek];
  }
}

export { formatDate };
