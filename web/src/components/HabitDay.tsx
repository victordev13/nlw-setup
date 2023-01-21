import dayjs from 'dayjs';
import * as Popover from '@radix-ui/react-popover';
import ProgressBar from './ProgressBar';
import clsx from 'clsx';
import { CheckBox } from './CheckBox';

const between = (val: number, gte: number, lt: number) =>
  val >= gte && val < lt;

interface Props {
  children: Date;
  completed: number;
  amount: number;
}

export function HabitDay({ children, completed, amount }: Props) {
  const dayAndMonth = dayjs(children).format('DD/MM');
  const weekDay = dayjs(children).format('dddd');

  const completedPercentage = Math.round((completed / amount) * 100);

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

          <div className='mt-6 flex flex-col gap-3'>
            <CheckBox>
              <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                Beber café
              </span>
            </CheckBox>
          </div>

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
