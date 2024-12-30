import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import EpisodeList from "./components/EpisodeList";
import PageContainer from "./container/PageContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    
    <PageContainer>
        <QueryClientProvider client={queryClient}>
            <EpisodeList/>
          </QueryClientProvider>
    </PageContainer>

    </>
  );
}

export default App;
