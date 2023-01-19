import dayjs from 'dayjs';

const dates: Date[] = [];
const today = new Date();
export function generateDatesFromYearBeginning() {
  if (dates.length > 0) {
    return dates;
  }

  const firstDayOfTheYear = dayjs().startOf('year');

  let compareDate = firstDayOfTheYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}
