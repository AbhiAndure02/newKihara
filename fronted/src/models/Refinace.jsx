import { Label } from 'flowbite-react'
import React, { useState } from 'react'

const Refinace = ({deductionAmount}) => {
    //const []
    const [noc, setNoc] = useState("")
    const [fc, setFc] = useState("")
    const [rhold, setRhold] = useState("")
    const [rCharges, setRCharges] = useState("")
    const [oAmount, setOAmount] = useState("")

    return (
        <div className='flex flex-wrap gap-10 m-5'>
            <div className='flex flex-col '>
                <Label htmlFor='pbank1' className='p-1 text-md' value='Prev Bank Name' />
                <input
                    id='rpBank1'
                    name='rpBank1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                />
            </div>
            <div className='flex flex-col'>
                <Label htmlFor='noc1' className='p-1 text-md' value='Noc' />
                <input
                    id='rnoc1'
                    name='rnoc1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e)=>setNoc(e.target.value)}
                />
            </div>

            
            

            <div className='flex flex-col '>
                <Label htmlFor='fc1' className='p-1 text-md' value='FC Amount' />
                <input
                    id='rfc1'
                    name='rfc1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e)=>setFc(e.target.value)}
                />
            </div>

            <div className='flex flex-col'>
                <Label htmlFor='rHold1' className='p-1 text-md' value='RTO Hold' />
                <input
                    id='rrHold1'
                    name='rrHold1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e)=>setRhold(e.target.value)}
                />
            </div>
            <div className='flex flex-col '>
                <Label htmlFor='rtoCharges1' className='p-1 text-md' value='RTO Charges' />
                <input
                    id='rrtoCharges1'
                    name='rrtoCharges1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e)=>setRCharges(e.target.value)}
                />
            </div>
            <div className='flex flex-col '>
                <Label htmlFor='rOtherAmount' className='p-1 text-md' value='Other Amount' />
                <input
                    id='rOtherAmount'
                    name='rOtherAmount'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    onChange={(e)=>setOAmount(e.target.value)}
                />
            </div>


            <div className='flex flex-col '>
                <Label htmlFor='rcustomerPay' className='p-1 text-md' value='Customer pay' />
                <input
                    id='rcustomerPay1'
                    name='rcustomerPay1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                    value={deductionAmount - (parseInt(noc)+ parseInt(oAmount) + parseInt(fc) + parseInt(rhold) + parseInt(rCharges))}
                />
            </div>
            

            <div className='flex flex-col '>
                <Label htmlFor='rrtoagent1' className='p-1 text-md' value='RTO Agent' />
                <input
                    id='rrtoAgent1'
                    name='rrtoAgent1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                />
            </div>

            <div className='flex flex-col '>
                <Label htmlFor='kiharas1' className='p-1 text-md' value='Kiharas' />
                <input
                    id='rkiharas1'
                    name='rkiharas1'
                    type='text'
                    className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                />
            </div>
        </div>
    )
}

export default Refinace
