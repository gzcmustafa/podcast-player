import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import EpisodeList from "./components/EpisodeList";
import PageContainer from "./container/PageContainer";
import AudioProvider from "./providers/AudioProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    
    <PageContainer>
        <QueryClientProvider client={queryClient}>
           <AudioProvider>
               <EpisodeList/>
           </AudioProvider>
          </QueryClientProvider>
    </PageContainer>

    </>
  );
}

export default App;
