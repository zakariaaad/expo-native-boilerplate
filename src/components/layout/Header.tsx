import { View, Text } from 'react-native';

type Props = {
  title: string;
  right?: React.ReactNode;
};

export function Header({ title, right }: Props) {
  return (
    <View className="flex-row items-center justify-between border-b border-border px-5 py-4 dark:border-border-dark">
      <Text className="text-2xl font-bold text-foreground dark:text-foreground-dark">
        {title}
      </Text>
      {right && <View className="shrink-0">{right}</View>}
    </View>
  );
}
