import { View } from 'react-native';
import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return (
    <View
      className={cn(
        'rounded-2xl border border-border bg-card',
        'shadow-sm shadow-black/5',
        'dark:border-border-dark dark:bg-card-dark',
        className
      )}
    >
      {children}
    </View>
  );
}
