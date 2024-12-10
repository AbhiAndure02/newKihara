import { Label } from 'flowbite-react'
import React from 'react'

const NewCar = () => {
  return (
    <div className='flex gap-20'>
    <div className='flex flex-col ml-5'>
    <Label htmlFor='newCarDetails' className='p-1 text-md' value='Show Room Name' />
    <input
        id='sname'
        name='sname'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
    />
    </div>
     <div className='flex flex-col '>
    <Label htmlFor='newCarDetails' className='p-1 text-md' value='New Car Details' />
    <input
        id='newCarD'
        name='newCarD'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
    />
</div>
</div>
  )
}

export default NewCar
