import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CirclePlay, Pause } from 'lucide-react';
import useAudioPlayer from '@/hooks/useAudioPlayer';




export default function Episode({episode}) {
  const player = useAudioPlayer(episode);
  console.log(player)
  return (
    <div className="w-full">
       <Card className="w-full">
       
      <CardHeader className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[150px] h-[150px] flex-shrink-0">
            <img className='w-full h-full object-cover rounded-lg shadow-xl' src={episode.imageUrl} alt="" />
          </div>
            
            <div className='flex-grow flex flex-col min-h-[150px]'>
              <CardTitle className="mb-2">
                <h1 className='text-xl'>{episode.name}</h1>
              </CardTitle>
              
              <CardDescription className="flex-grow overflow-y-auto mb-4" style={{ maxHeight: '80px' }}>
                <p className='line-clamp-4' dangerouslySetInnerHTML={{ __html:episode.description }} />
              </CardDescription>
              
              <div className="mt-auto">
                <Button onClick={() => player.toggle()} variant="outline" size="icon">
                  {player.playing ? <Pause/> : <CirclePlay/>}
                </Button>
              </div>
            </div>

      </div>
      </CardHeader>
     
     
    </Card>
    </div>
  )
}
