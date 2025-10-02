import React, { use } from 'react'
import { useContext } from 'react'
import { MyStore } from '../context/Mycontext'

export const Data = () => {
    let data = useContext(MyStore);
    
    


  return (
    <div className='text-white'>
        <h1>
        city -- {data?.location.name || '...' }
        </h1>
        <h1>
            temp -- {data?.current.temp_c ?? '...'}°C
        </h1>
        <h1>
            country -- {data?.location.country || '...'}
        </h1>
    
    </div>
  )
}
