import { Label, TextInput } from 'flowbite-react'
import React from 'react'

function Register() {
  return (
    <div className='w-full flex justify-center items-center bg-gray-300'>
        <div className='bg-white w-[750px] my-20 rounded-lg border-2 border-gray-700 shadow-slate-900 shadow-2xl opacity-75'>
            <h1 className='text-3xl font-bold text-purple-700  opacity-90 text-center m-6'>Registration</h1>
            
            <form action="" className='m-3 mt-14 flex flex-col gap-10'>
                <div className='flex gap-10 justify-around'>
                <div className='flex gap-2 '>
                    <Label htmlFor='name' className='p-2 text-md' value='Name' />
                    <TextInput id='name'name ="name" type='text' />
                </div>
                <div className='flex gap-2 '>
                    <Label htmlFor='number' className='p-2 text-md' value='Number' />
                    <TextInput id='number'name ="numer" type='text' />
                </div>
                </div>

                <div className='flex justify-around'>


                <div className='flex gap-2 '>
                    <Label htmlFor='rNumber' className='p-2 text-md' value='Registration No.' />
                    <TextInput id='rNumber' name ="rNumber" type='text' />
                </div>
                
                <div className='flex gap-2 '>
                    <Label htmlFor='city' className='p-2 text-md' value='city Name' />
                    <TextInput id='city' name="city" type='text' />
                </div>
                </div>

                <div className='flex justify-around'>
                <div className='flex gap-2 '>
                    <Label htmlFor='vName' className='p-2 text-md' value='Vehicle  Name' />
                    <TextInput id='vName' name='vNaeme' type='text' />
                </div>
                <div className='flex gap-2 '>
                   <Label htmlFor='bank' className='p-2 text-md' value='Bank Name' />
                    <TextInput id='bank' name='bank' type='text' />
                </div >
                </div>

                <div className='flex justify-around'>
                <div className='flex gap-2 '>
                   <Label htmlFor='netDistribution' className='p-2 text-md' value='Net Distribution' />
                    <TextInput id='netDistribution' name='netDistribution' type='text' />
                </div >

                <div className='flex gap-2 '>
                   <Label htmlFor='hAmount' className='p-2 text-md' value='Hold Amount' />
                    <TextInput id='hAmount' name='hAmount' type='text' />
                </div >
                </div>

                <div className='flex justify-around'>
                <div className='flex gap-2 '>
                   <Label htmlFor='lAmount' className='p-2 text-md' value='Loan Amount' />
                    <TextInput id='lAmount' type='text' name='lAmount'/>
                </div >
                <div className='flex gap-2 '>
                   <Label htmlFor='number' className='p-2 text-md' value='RTO status ' />
                    <TextInput id='number' type='number' />
                </div >
                </div>

                <div className='flex justify-around'>
                <div className='flex gap-2 '>
                   <Label htmlFor='number' className='p-2 text-md' value='Loan Type' />
                    <TextInput id='number' type='number' />
                </div >
                <div className='flex justify-around'>
                   <Label htmlFor='rtoCharges' className='p-2 text-md ' value='RTO Charges' />
                    <TextInput id='rtoCharges' name='rtoCharges' type='text' />
                </div >
                </div>
                <div className='flex gap-14 mx-5 '>
                   <Label htmlFor='number' className='p-2 text-md' value='current Address' />
                    <TextInput id='number'className='w-[400px]' type='number' />
                </div >
                <div className='flex gap-10 mx-5'>
                   <Label htmlFor='number' className='p-2 text-md' value='Permanent Address' />
                    <TextInput id='number' className='w-[400px]' type='number' />
                </div >

                <div className='flex justify-center items-center'>
                <button className='mt-2 mb-2 text-white bg-purple-700 hover:bg-gray-700 w-[100px] p-2 rounded-md font-xl' type="submit">Submit</button>
                </div>

              
            </form>

      </div>
    </div>
  )
}

export default Register
