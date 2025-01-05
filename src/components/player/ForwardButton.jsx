import React from 'react'
import { Button } from '../ui/button'
import { Redo2 } from 'lucide-react'

export default function ForwardButton({onForward}) {
  return (
   <Button  onClick={onForward}>
    <Redo2 size={24}/>
   </Button>
  )
}
