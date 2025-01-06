import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from "react-query";

 
  import AudioPlayer from "@/components/player/AudioPlayer";
import EpisodeList from "@/components/EpisodeList";
import PageContainer from "@/container/PageContainer";
import AudioProvider from "@/providers/AudioProvider";
  
  const queryClient = new QueryClient();

export default function EpisodeHome() {
  return (
    <div>

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
      
    </div>
  )
}
