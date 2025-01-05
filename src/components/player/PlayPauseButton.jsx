import { CirclePlay, Pause } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button';

export default function PlayPauseButton( {isPlaying,onPlayPauseToggle}) {
    const Icon = isPlaying ? Pause : CirclePlay; 
  return (
   <Button onClick={onPlayPauseToggle}>
        <Icon size={24}/>
   </Button>
  )
}
