import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { CheckBox } from './CheckBox';

interface DayHabitsListProps {
  date: Date;
  onCompletedChange: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function DayHabitsList({ date, onCompletedChange }: DayHabitsListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>({
    possibleHabits: [],
    completedHabits: [],
  });

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabitsInfo(response.data));
  }, []);

  async function handleToggleHabit(habitId: string) {
    await api.patch(`habits/${habitId}/toggle`);

    const isHabitAlreadyCompleted =
      habitsInfo.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo.completedHabits.filter((id) => id !== habitId);
    } else {
      completedHabits = [...habitsInfo.completedHabits, habitId];
    }

    setHabitsInfo({ possibleHabits: habitsInfo.possibleHabits, completedHabits });

    onCompletedChange(completedHabits.length);
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo.possibleHabits.map((habit) => (
        <CheckBox
          key={habit.id}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          onCheckedChange={() => handleToggleHabit(habit.id)}
        >
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {habit.title}
          </span>
        </CheckBox>
      ))}
    </div>
  );
}
