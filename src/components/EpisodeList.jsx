import React from 'react'
import {gql, GraphQLClient} from "graphql-request"
import { useQuery } from 'react-query'
import Episode from './Episode'


const TADDY_API_KEY = import.meta.env.VITE_TADDY_API_KEY
const TADDY_USER_ID = import.meta.env.VITE_TADDY_USER_ID

const GET_PODCASTSERIES = gql`
  query getPodcastSeries($name: String!) {
    getPodcastSeries(name: $name) {
        uuid
        name
        description
        episodes {
            uuid
            name
            description
            datePublished
            audioUrl
            duration
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
   

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['episodes'],
        queryFn: async () => {
            const data = await client.request(GET_PODCASTSERIES,{
                name:"The Daily",
            })
            return data
        },
        select: (data) => data.getPodcastSeries.episodes
        
      })
    console.log(data)

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error: {error.message}</div>
    
  return (
    <div className='flex flex-col items-center justify-center my-5'>
       <h1 className='text-4xl font-bold'>Episodes</h1>
       <div className='grid grid-cols-1 gap-4 mt-4'>
            {data.map((episode) => (
              <Episode key={episode.uuid} episode={episode}>

              </Episode>
            ))}
       </div>      
    </div>
  )
}
