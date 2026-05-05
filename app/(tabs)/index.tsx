import { Text, ScrollView, RefreshControl, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { usePosts } from '@/hooks/usePosts';
import { Card } from '@/components/ui/Card';
import { Header } from '@/components/layout/Header';

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { data: posts, isLoading, refetch, isRefetching } = usePosts();

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      <Header title={`Hello, ${user?.name ?? 'there'} 👋`} />
      <ScrollView
        contentContainerClassName="p-4 gap-3"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        {isLoading ? (
          <Text className="mt-10 text-center text-base text-muted dark:text-muted-dark">
            Loading...
          </Text>
        ) : (
          posts?.map((post) => (
            <Card key={post.id} className="p-4">
              <Text className="mb-1.5 text-base font-semibold text-foreground dark:text-foreground-dark">
                {post.title}
              </Text>
              <Text className="text-sm leading-5 text-muted dark:text-muted-dark">
                {post.body}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
