import { Spinner } from './spinner';

interface LoadingStateProps {
  message?: string;
  fullPage?: boolean;
}

export function LoadingState({ message = 'Loading...', fullPage = false }: LoadingStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <Spinner size="lg" />
      <p className="text-[#A0AEC0]">{message}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0E27]">
        {content}
      </div>
    );
  }

  return content;
}
