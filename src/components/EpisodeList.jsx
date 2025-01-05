import React, { useState } from 'react'
import {gql, GraphQLClient} from "graphql-request"
import { useQuery } from 'react-query'
import Episode from './Episode'
import SearchBar from './SearchBar'

const TADDY_API_KEY = import.meta.env.VITE_TADDY_API_KEY
const TADDY_USER_ID = import.meta.env.VITE_TADDY_USER_ID

const GET_PODCASTSERIES = gql`
  query getPodcastSeries($name: String!) {
    getPodcastSeries(name: $name) {
        uuid
        name
        description
        imageUrl
        episodes {
            uuid
            name
            description
            datePublished
            audioUrl
            duration
            imageUrl
        }
    }
  }
`;

const client = new GraphQLClient ("https://api.taddy.org/",{
    headers:{
        "X-USER-ID": TADDY_USER_ID,
        "X-API-KEY": TADDY_API_KEY
    }
})

export default function EpisodeList() {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("The Daily");

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['episodes', searchTerm],
        queryFn: async () => {
            try {
                const response = await client.request(GET_PODCASTSERIES, {
                    name: searchTerm,
                });
                return response;
            } catch (error) {
                console.error("API Error:", error);
                return { getPodcastSeries: { episodes: [] } };
            }
        },
        select: (data) => {
            if (!data?.getPodcastSeries) {
                return [];
            }
            const podcastSeries = data.getPodcastSeries;
            return podcastSeries.episodes.map(episode => ({
                ...episode,
                imageUrl: episode.imageUrl || podcastSeries.imageUrl
            }));
        },
        enabled: !!searchTerm
    });

    const handleSearch = () => {
        if (inputValue.trim()) {
            setSearchTerm(inputValue.trim());
        }
    };

    if(isLoading) return <div>Loading...</div>;
    if(isError) return <div>Error: {error.message}</div>;

    return (
        <div className='flex flex-col items-center justify-center my-5'>
            <h1 className='text-4xl font-bold'>
                {searchTerm ? `${searchTerm} Episodes` : 'Episodes'}
            </h1> 
            <SearchBar 
                searchTerm={inputValue}
                setSearchTerm={setInputValue}
                onSearch={handleSearch}
            />
          
            <div className='grid grid-cols-1 gap-4 mt-4'>
                {data && data.length > 0 ? (
                    data.map((episode) => (
                        <Episode key={episode.uuid} episode={episode} />
                    ))
                ) : (
                    <div>There is not podcast episodes for {searchTerm}  </div>
                )}
            </div>      
        </div>
    );
}
