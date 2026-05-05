import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'outline' | 'ghost';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const variantStyles: Record<Variant, { container: string; label: string }> = {
  primary: {
    container: 'bg-primary dark:bg-primary-dark',
    label: 'text-primary-foreground font-semibold',
  },
  outline: {
    container: 'border border-primary dark:border-primary-dark bg-transparent',
    label: 'text-primary dark:text-primary-dark font-semibold',
  },
  ghost: {
    container: 'bg-transparent',
    label: 'text-primary dark:text-primary-dark font-semibold',
  },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  className,
}: Props) {
  const { container, label } = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      className={cn(
        'h-13 items-center justify-center rounded-xl px-6',
        container,
        (disabled || loading) && 'opacity-50',
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={cn('text-base', label)}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}
