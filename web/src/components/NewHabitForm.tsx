import { Check } from 'phosphor-react';
import { CheckBox } from './CheckBox';
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export default function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (weekDays.length === 0) {
      alert('Selecione ao menos um dia da semana!');
      return;
    }

    await api.post('habits', {
      title,
      weekDays,
    });

    setTitle('');
    setWeekDays([]);
    alert('Hábito criado com sucesso!');
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  return (
    <form
      className='w-full flex flex-col mt-6'
      onSubmit={handleSubmit}
    >
      <label
        className='font-semibold leading-tight'
        htmlFor='title'
      >
        Qual seu comprometimento?
      </label>

      <input
        type='text'
        id='title'
        placeholder='dormir cedo, ir à academia...'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400'
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        minLength={3}
      />

      <label
        className='font-semibold leading-tight mt-4'
        htmlFor='title'
      >
        Qual a recorrência?
      </label>

      <div className='flex flex-col gap-2 mt-3'>
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox
            key={weekDay}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <span className='text-white leading-tight'>{weekDay}</span>
          </CheckBox>
        ))}
      </div>

      <button
        type='submit'
        className='mt-6 rounded-lg p-4 flex gap-3 items-center font-semibold bg-green-600 justify-center hover:bg-green-500'
      >
        <Check
          size={20}
          weight='bold'
        />
        Me comprometo
      </button>
    </form>
  );
}
