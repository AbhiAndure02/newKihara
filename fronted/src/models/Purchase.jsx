import { Label } from 'flowbite-react'
import React, { useState } from 'react'

const Purchase = ({ deductionAmount }) => {
    const [noc, setNoc] = useState(0)
    const [otherAmount, setOtherAmount] = useState(0)
    const [rCharges, setRCharges] = useState(0)
    const [rHold, setRHold] = useState(0)
    const [fc, setFC] = useState(0)
    return (
        <div className='flex flex-wrap gap-10 mx-5'>
            <div className='flex flex-col '>
                <Label htmlFor='pbank' className='p-1 text-md' value='Prev Bank Name' />
                <input
                    id='ppBank'
                    name='ppBank'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                />
            </div>
            <div className='flex flex-col'>

                <Label htmlFor='rHold' className='p-1 text-md' value='RTO Hold' />
                <input
                    id='prHold'
                    name='prHold'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e) => setRHold(e.target.value)}
                />
            </div>
            <div className='flex flex-col '>
                <Label htmlFor='fc' className='p-1 text-md' value='FC Amount' />
                <input
                    id='pfc'
                    name='pfc'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e) => setFC(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <Label htmlFor='noc' className='p-1 text-md' value='Noc ' />
                <input
                    id='pnoc'
                    name='pnoc'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e) => setNoc(e.target.value)}
                />
            </div>

            <div className='flex flex-col'>
                <Label htmlFor='PoAmount' className='p-1 text-md' value='Other Amount' />
                <input
                    id='PoAmount'
                    name='PoAmount'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e) => setOtherAmount(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <Label htmlFor='rtoCharges' className='p-1 text-md' value='RTO Charges' />
                <input
                    id='prtoCharges'
                    name='prtoCharges'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e) => setRCharges(e.target.value)}
                />
            </div>

            <div className='flex flex-col '>
                <Label htmlFor='customerPay' className='p-1 text-md' value='Customer Pay' />
                <input
                    id='pcustomerPay'
                    name='pcustomerPay'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    value={deductionAmount-(parseInt(noc)+parseInt(otherAmount)+parseInt(fc)+parseInt(rCharges)+parseInt(rHold))}
                />
            </div>




            <div className='flex flex-col '>
                <Label htmlFor='rtoAgent' className='p-1 text-md' value='Rto Agent' />
                <input
                    id='prtoAgent'
                    name='prtoAgent'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' />
            </div>

            <div className='flex flex-col'>
                <Label htmlFor='pkiaharas' className='p-1 text-md' value='Kiharas' />
                <input
                    id='pkiharas'
                    name='pkiharas'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                />
            </div>


        </div>

    )
}

export default Purchase
