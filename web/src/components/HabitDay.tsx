import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import clsx from 'clsx';
import { DayHabitsList } from './DayHabitsList';
import { useState } from 'react';

const between = (val: number, gte: number, lt: number) =>
  val >= gte && val < lt;

interface Props {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

export function HabitDay({ date, defaultCompleted = 0, amount = 0 }: Props) {
  const [completed, setCompleted] = useState(defaultCompleted);

  const dayAndMonth = dayjs(date).format('DD/MM');
  const weekDay = dayjs(date).format('dddd');

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;

  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  function handleCompletedChange(completed: number) {
    setCompleted(completed);
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx(
          'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600': between(
              completedPercentage,
              20,
              40
            ),
            'bg-violet-700 border-violet-500': between(
              completedPercentage,
              40,
              60
            ),
            'bg-violet-600 border-violet-500': between(
              completedPercentage,
              60,
              80
            ),
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
            ['border-white border-4']: isCurrentDay,
          }
        )}
        title={dayAndMonth}
      />

      <Popover.Portal>
        <Popover.Content className='min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{weekDay}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <DayHabitsList
            date={date}
            onCompletedChange={handleCompletedChange}
          />
          <Popover.Arrow
            height={8}
            width={16}
            className='fill-zinc-900'
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
