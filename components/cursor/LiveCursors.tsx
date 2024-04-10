import { COLORS } from '@/constants';
import { LiveCursorProps } from '@/types/type'
import React from 'react'
import Cursor from './Cursor';

const LiveCursors =({others}:LiveCursorProps)=> {
  //maping over other persons
 return others.map(({ connectionId,presence })=>{
        if(presence== null || !presence?.cursor) 
          {return null;}
        
        return (
          <Cursor
           key={connectionId}
           //pick random color from colors array
           color={COLORS[Number(connectionId)%COLORS.length]}
           x={presence.cursor.x}
           y={presence.cursor.y}
           message={presence.message}
           />

        )
  })
}

export default LiveCursors
