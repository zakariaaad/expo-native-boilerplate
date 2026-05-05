import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await apiClient.get<Post[]>('/posts?_limit=10');
  return data;
};

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
