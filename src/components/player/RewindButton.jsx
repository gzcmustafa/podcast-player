import React from 'react'
import { Button } from '../ui/button'
import { Undo2 } from 'lucide-react'

export default function RewindButton({onRewind}) {
  return (
   <Button  onClick={onRewind}>
    <Undo2 size={24}/>
   </Button>
  )
}
