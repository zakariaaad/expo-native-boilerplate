import { View, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/layout/Header';

export default function ExploreScreen() {
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <Header title="Explore" />
      <View className="flex-1 p-4">
        <View className="mb-6 h-12 flex-row items-center gap-2.5 rounded-xl border border-border bg-card px-4 dark:border-border-dark dark:bg-card-dark">
          <Ionicons name="search-outline" size={18} color="#9CA3AF" />
          <TextInput
            className="flex-1 text-sm text-foreground dark:text-foreground-dark"
            placeholder="Search..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
          />
        </View>
        <Text className="mt-10 text-center text-base text-muted dark:text-muted-dark">
          Start exploring content here.
        </Text>
      </View>
    </SafeAreaView>
  );
}
