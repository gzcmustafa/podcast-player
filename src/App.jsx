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
import AudioPlayer from "./components/player/AudioPlayer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
    
    <PageContainer>
        <QueryClientProvider client={queryClient}>
           <AudioProvider>
               <EpisodeList/>
                <div className="fixed inset-x-0 bottom-10">
                <AudioPlayer />
                </div>
           </AudioProvider>
          </QueryClientProvider>
    </PageContainer>

    </>
  );
}

export default App;
