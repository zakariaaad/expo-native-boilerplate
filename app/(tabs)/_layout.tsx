import { Tabs, Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  const { token } = useAuthStore();
  const { isDark } = useThemeStore();

  if (!token) return <Redirect href="/(auth)/login" />;

  // Tab bar colors derived from theme — the only place we still need raw values
  // because React Navigation's tabBarStyle doesn't accept className
  const tabBarBg = isDark ? '#1E293B' : '#FFFFFF';
  const tabBarBorder = isDark ? '#334155' : '#E5E7EB';
  const activeColor = isDark ? '#818CF8' : '#6366F1';
  const inactiveColor = isDark ? '#94A3B8' : '#6B7280';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: tabBarBg,
          borderTopColor: tabBarBorder,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
