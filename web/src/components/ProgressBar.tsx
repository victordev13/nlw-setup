import * as Progress from '@radix-ui/react-progress';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Progress.Root className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
      <Progress.Indicator
        aria-valuenow={progress}
        className='h-3 rounded-xl bg-violet-600 w-3/4'
        style={{
          width: `${progress}%`,
        }}
      />
    </Progress.Root>
  );
}
