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
import { CirclePlay } from 'lucide-react';




export default function Episode({episode}) {
  return (
    <div>
       <Card className="">
      <CardHeader>
        <CardTitle><h1 className='text-xl'>{episode.name}</h1></CardTitle>
        <CardDescription>
          
          <p className=' line-clamp-4' dangerouslySetInnerHTML={{ __html:episode.description}}
          
          />
        
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="icon" >
           <CirclePlay size={9000} />
        </Button>
      </CardFooter>
     
    </Card>
    </div>
  )
}
