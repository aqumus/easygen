import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getUserQueryOptions} from "@/features/auth";
import { Dashboard } from '@/features/dashboard';
import { HydrationBoundary } from '@tanstack/react-query';

export default async function Index() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getUserQueryOptions());

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Dashboard />
    </HydrationBoundary>
  )
}
