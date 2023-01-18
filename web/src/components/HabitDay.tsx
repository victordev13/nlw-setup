import dayjs from 'dayjs';

interface Props {
  children: Date;
}

export function HabitDay({ children }: Props) {
  const dateString = dayjs(children).format('YYYY-MM-DD');

  return (
    <div
      className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg'
      title={dateString}
    />
  );
}
