import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckboxProps } from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { ReactNode } from 'react';

interface Props extends CheckboxProps {
  children?: ReactNode;
}

export function CheckBox({ children, ...props }: Props) {
  return (
    <RadixCheckbox.Root
      className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
      {...props}
    >
      <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background'>
        <RadixCheckbox.CheckboxIndicator>
          <Check
            size={20}
            className='text-white'
          />
        </RadixCheckbox.CheckboxIndicator>
      </div>
      {children}
    </RadixCheckbox.Root>
  );
}
