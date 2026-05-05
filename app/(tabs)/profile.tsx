import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/store/themeStore';
import { useAuthStore } from '@/store/authStore';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/Card';

type RowProps = {
  icon: string;
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
};

function Row({ icon, label, right, onPress }: RowProps) {
  return (
    <TouchableOpacity
      className="flex-row items-center justify-between px-4 py-3.5"
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon as any} size={20} color="#6366F1" />
        <Text className="text-base text-foreground dark:text-foreground-dark">{label}</Text>
      </View>
      {right ?? (
        <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

function Separator() {
  return <View className="mx-4 h-px bg-border dark:bg-border-dark" />;
}

export default function ProfileScreen() {
  const { isDark, toggle } = useTheme();
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <Header title="Profile" />

      <View className="flex-1 items-center p-4">
        {/* Avatar */}
        <View className="mt-4 mb-3 h-20 w-20 items-center justify-center rounded-full bg-primary dark:bg-primary-dark">
          <Text className="text-4xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </Text>
        </View>
        <Text className="mb-1 text-xl font-bold text-foreground dark:text-foreground-dark">
          {user?.name}
        </Text>
        <Text className="mb-7 text-sm text-muted dark:text-muted-dark">
          {user?.email}
        </Text>

        {/* Settings card */}
        <Card className="mb-3 w-full overflow-hidden p-0">
          <Row
            icon="moon-outline"
            label="Dark Mode"
            right={
              <Switch
                value={isDark}
                onValueChange={toggle}
                trackColor={{ true: '#6366F1' }}
              />
            }
          />
          <Separator />
          <Row icon="notifications-outline" label="Notifications" />
          <Separator />
          <Row icon="shield-outline" label="Privacy" />
        </Card>

        {/* Logout card */}
        <Card className="w-full overflow-hidden p-0">
          <Row
            icon="log-out-outline"
            label="Logout"
            onPress={logout}
            right={<View />}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}
