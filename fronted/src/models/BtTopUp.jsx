import { Label } from 'flowbite-react' 
import React, { useState } from 'react'

const BtTopUp = ({deductionAmount, registerData}) => {
    const [fc, setFc] = useState(0)
    const [amount, setAmount] = useState(0)
    const [rhold, setRhold] = useState(0)
    const [rCharges, setRCharges] = useState(0)
    const [noc, setNoc] = useState(0)


  return (
    <div className='flex flex-wrap gap-10 ml-5'>
  
<div className='flex flex-col '>
    <Label htmlFor='pBank1' className='p-1 text-md' value='Prev Bank' />
    <input
        id='bpBank1'
        name='bpBank1'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
       
    />
    </div>
   <div className='flex flex-col '>
    <Label htmlFor='bnoce' className='p-1 text-md' value='NOC' />
    <input
        id='bnoc'
        name='bnoc'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        onChange={(e)=> setNoc(e.target.value)}
    />
    </div>
    <div className='flex flex-col '>
    <Label htmlFor='fc2' className='p-1 text-md' value='FC' />
    <input
        id='bfc2'
        name='bfc2'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        onChange={(e)=> setFc(e.target.value)}
    />
</div>
<div className='flex flex-col'>
    <Label htmlFor='oAmount' className='p-1 text-md' value='Other Amount' />
    <input
        id='boAmount'
        name='boAmount'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        onChange={(e)=> setAmount(e.target.value)}
    />
    </div>
  
<div className='flex flex-col'>
    <Label htmlFor='rHold2' className='p-1 text-md' value='Rto Hold' />
    <input
        id='brHold2'
        name='brHold2'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        onChange={(e)=> setRhold(e.target.value)}
    />
    </div>
     <div className='flex flex-col '>
    <Label htmlFor='rtoCharges2' className='p-1 text-md' value='RTO Charges' />
    <input
        id='brtoCharges2'
        name='brtoCharges2'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        onChange={(e)=> setRCharges(e.target.value)}
    />
</div>
<div className='flex flex-col '>
    <Label htmlFor='customerPay2' className='p-1 text-md' value='Customer Pay' />
    <input
        id='bcustomerPay2'
        name='bcustomerPay2'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
        disabled 
        value={deductionAmount-(parseInt(fc)+parseInt(noc)+parseInt(amount)+parseInt(rhold)+parseInt(rCharges))}
    />
</div>
<div className='flex flex-col '>
    <Label htmlFor='rAgent' className='p-1 text-md' value='RTO Agent' />
    <input
        id='brAgent'
        name='brAgent'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
    />
    </div>
     <div className='flex flex-col '>
    <Label htmlFor='kiharas2' className='p-1 text-md' value='Kiharas' />
    <input
        id='bkiharas2'
        name='bkiharas2'
        type='text'
        className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
    />
</div>
</div>
  )
}

export default BtTopUp