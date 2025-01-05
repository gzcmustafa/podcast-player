import React from 'react'
import { Button } from '../ui/button'
import { VolumeX,Volume2} from 'lucide-react';


export default function MuteButton({isMute,onMute}) {
    const Icon = isMute ? VolumeX: Volume2;
  return (
    <Button onClick={onMute}>
      <Icon/>
    </Button>
  )
}
