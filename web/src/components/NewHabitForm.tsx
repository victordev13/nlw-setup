import { Check } from 'phosphor-react';

export default function NewHabitForm() {
  return (
    <form className='w-full flex flex-col mt-6'>
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
      />

      <label
        className='font-semibold leading-tight mt-4'
        htmlFor='title'
      >
        Qual a recorrência?
      </label>

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
