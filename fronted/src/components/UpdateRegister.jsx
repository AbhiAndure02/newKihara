import { Button, Label, Modal, Select, Spinner } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import banks from '../helper/bankName';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineExclamationCircle } from 'react-icons/hi';


const UpdateRegister = () => {
    const { slug } = useParams(); // Destructure the slug parameter

    const { currentUser } = useSelector(state => state.user)
    const [openModal, setOpenModal] = useState(false);
    const [registerData, setRegisterData] = useState(null); // State to store the product data

    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [sameAddress, setSameAddress] = useState(false);
    const [loanAmount, setLoanAmount] = useState(0)
    const [lpi, setLpi] = useState(0)
    const [mia, setMia] = useState(0)
    const [mia2, setMia2] = useState(0)
    const [bankname, setbankname] = useState("")
    const [did, setdid] = useState(0)
    const [addData, setAddData] = useState("");
    const [loanType, setLoanType] = useState("");
    const [res, setRes] = useState("")
    const[succModal, setSuccModal] = useState(false)

    console.log(banks)



    const [pf, setPf] = useState(0)
    const [vc, setvc] = useState(0)
    const [sd, setsd] = useState(0)
    const [doc, setdoc] = useState(0)
    const [li, setli] = useState(0)
    const [other, setOther] = useState(0)

    const totalAmount = parseInt(loanAmount) + parseInt(mia) + parseInt(lpi) + parseInt(mia2)
    const tdid = parseInt(li) + parseInt(doc) + parseInt(sd) + parseInt(pf) + parseInt(vc) + parseInt(other)
    const deductionAmount = parseInt(loanAmount) - tdid



    //Purchase
    const [fRCharges, setFRCharges] = useState(0);
    const [fRHold, setFRHold] = useState(0);
    const [fFc, setFFc] = useState(0);
    const [fOtherAmount, setFOtherAmount] = useState(0);
    const [fNoc, setFNoc] = useState(0);

    const purchaseCustomerPay = deductionAmount - (parseInt(fNoc) + parseInt(fOtherAmount) + parseInt(fFc) + parseInt(fRCharges) + parseInt(fRHold))


    //BTTopUpUpdate

    const [bRCharges, setBRCharges] = useState(0);
    const [bRHold, setBRHold] = useState(0);
    const [bFc, setBFc] = useState(0);
    const [bOtherAmount, setBOtherAmount] = useState(0);
    const [bNoc, setBNoc] = useState(0);

    const btTopUpCustomerPay = deductionAmount - (parseInt(bFc) + parseInt(bNoc) + parseInt(bOtherAmount) + parseInt(bRHold) + parseInt(bRCharges))



    //Refinence
    const [rRCharges, setRRCharges] = useState(0);
    const [rRhold, setRRhold] = useState(0);
    const [rFc, setRFc] = useState(0);
    const [rOtherAmount, setROtherAmount] = useState(0);
    const [rNoc, setRNoc] = useState(0);

    const refinenceCustomerPay = deductionAmount - (parseInt(rNoc) + parseInt(rOtherAmount) + parseInt(rFc) + parseInt(rRhold) + parseInt(rRCharges))


    const formatDateToInput = (isoDate) => {
        const date = new Date(isoDate);
        console.log(date)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1)
        console.log(month)
        const day = date.getDate()

        return `${month}-${day}-${year}`;
    };
    



    useEffect(() => {
        const getRegiData = async () => {
            setLoading(true)

            try {
                console.log(`Fetching product with slug: ${slug}`);
                const res = await axios.get(`/api/getregister?slug=${slug}`);
                console.log('Response data:', res.data);

                // Assuming your API returns a single item array for the specific slug
                if (res.data.registerData && res.data.registerData.length > 0) {
                    // Check if the slug in the response matches the requested slug
                    const filteredData = res.data.registerData.find(item => item.slug === slug);
                    if (filteredData) {
                        console.log("filteredData" + filteredData)
                        setRegisterData(filteredData);
                        setLoading(false)

                        // Store the correct entry
                    } else {
                        setError('No products found for this slug');
                        setLoading(false)

                    }
                } else {
                    setError('No products found for this slug');
                    setLoading(false)

                }
            } catch (error) {
                console.error('Error fetching the product:', error);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };
        getRegiData();
    }, [slug]);

    if (loading) {
        return (
            <div className='w-full h-screen flex justify-center items-center'>

                <Spinner size='md' />
            </div>
        )
    }
    

    const handleUpdate = async (e) => {
        e.preventDefault();
       const formData = new FormData(e.target)
       const object = Object.fromEntries(formData.entries());


        try{
            const res = await axios.put(`/api/registrations/${registerData._id}`, {...object});
            setSuccModal(true)


            console.log(res.data)

        }
        catch(error){
            console.error('Error updating the product:', error);
            setError('Failed to update product');
        }

    }


    return (
        <>
            <div className='w-full flex justify-center items-center bg-[#1974A6]'>
                {error && <p>{error}</p>} {/* Show error message if any */}
                {registerData ? (
                    <div className='bg-white w-[95%] my-5 rounded-lg border-2 border-gray-700 shadow-slate-900 shadow-2xl '>
                        <h1 className='text-3xl font-bold text-[#1974A6]  text-center m-6'>Update Register</h1>
                        <form className='m-3 mt-14 flex flex-col gap-6' onSubmit={handleUpdate}>
                            <div className='flex justify-between mx-5'>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='name' className='p-1 text-md' value='Name' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <input id='name' name='name' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.name || ''}
                                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <Label htmlFor='rNumber' className='p-1 text-md' value='Registration No.' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>

                                    </div>
                                    <input id='rNumber' name='rNumber' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.rNumber || ''}
                                        onChange={(e) => setRegisterData({ ...registerData, rNumber: e.target.value })} />
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='city' className='p-1 text-md' value='City Name' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <input id='city' name='city' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.city || ''}
                                        onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })} />
                                </div>

                            </div>
                            <div className='flex justify-between mx-5'>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='number' className='p-1 text-md' value='Contact' />
                                        <span className=' text-xl pb-3 text-red-600'>*</span>


                                    </div>
                                    <input id='number' name='number' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.number || ''}
                                        onChange={(e) => setRegisterData({ ...registerData, number: e.target.value })} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='number' className='p-1 text-md' value='Contact 2' />
                                    </div>
                                    <input id='number2' name='number2' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.number2 || ''}
                                        onChange={(e) => setRegisterData({ ...registerData, number2: e.target.value })} />
                                </div>
                                <div className='flex flex-col gap-1 '>
                                    <div>
                                        <Label htmlFor='cAddress' className='p-1 text-md' value='Current Address' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>


                                    </div>
                                    <input id='cAddress' name='cAddress' className='w-[350px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.cAddress || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, cAddress: e.target.value }); // Update registerData state
                                            setAddData(e.target.value); // Update addData state
                                        }} />
                                </div>

                            </div>

                            <div className='flex justify-between gap-10 mx-5'>

                                <div className='flex flex-col gap-2'>
                                    <div>
                                        <Label htmlFor='vName' className='p-1 text-md' value='Vehicle Name ' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <input id='vName' name='vName' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.vName || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, vName: e.target.value })
                                        }} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='bank' className='p-2 text-md' value='Bank Name ' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <Select id='bank' name='bank' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.bank || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, bank: e.target.value }); // Update registerData state
                                            setbankname(e.target.value); // Update addData state
                                        }}  >
                                        <option value="">select Bank</option>
                                        {
                                            banks.map((bank) => (
                                                <option key={bank.id} value={bank.name}>{bank.name}</option>
                                            ))
                                        }


                                    </Select>
                                </div>


                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='femi' className='p-2 text-md' value='1st EMI' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>
                                    </div>
                                    <input
                                        id='femi'
                                        name='femi'
                                        type='date'
                                        className='w-[155px] h-8 bottom-1 rounded-md items-center py-1'
                                        value={registerData.femi || ""}
                                        onChange={(e) => setRegisterData({ ...registerData, femi : e.target.value })}
                                    />
                                </div>


                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='roi' className='p-2 text-md' value='ROI' />
                                        <span className='text-xl pb-3 text-red-600'>*</span>

                                    </div>
                                    <input id='roi' name='roi' type='text' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.roi || ""}
                                        onChange={(e) => setRegisterData({ ...registerData, roi: e.target.value })} />

                                </div>


                                <div className='flex flex-col gap-1'>
                                    <div>
                                        <Label htmlFor='flat' className='p-2 text-md' value='Flat' />

                                    </div>
                                    <input id='flat' name='flat' type='text' className='w-[155px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.flat || ""}
                                        onChange={(e) => setRegisterData({ ...registerData, flat: e.target.value })} />
                                </div>

                            </div>


                            <div className='flex justify-between mx-5'>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor='lAmount' className='p-1 text-md' value='Loan Amount *' />
                                    <input id='lAmount' name='lAmount' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.lAmount || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, lAmount: e.target.value }); // Update registerData state
                                            setLoanAmount(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor='lpi' className='p-1 text-md' value='LPI ' />
                                    <input id='lpi' name='lpi' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.lpi || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, lpi: e.target.value }); // Update registerData state
                                            setLpi(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor='moter' className='p-1 text-md' value='Moter Insurence *' />
                                    <input id='moter' name='moter' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.moter || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, moter: e.target.value }); // Update registerData state
                                            setMia(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor='Admin' className='p-1 text-md' value='Admin' />
                                    <input id='admin' name='admin' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.admin || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, admin: e.target.value }); // Update registerData state
                                            setMia2(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <Label htmlFor='tloanamount' className='p-1 text-md' value='Total Amount *' />
                                    <input id='tLAmount' name='tLAmount' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={!totalAmount ? registerData.tloanamount : totalAmount || ''} disabled />
                                </div>

                            </div>

                            <div className='flex justify-between mx-5'>
                                <div className='flex flex-col'>
                                    <Label htmlFor='pf' className='p-2 text-md' value='PF' />
                                    <input id='pf' name='pf' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.pf || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, pf: e.target.value }); // Update registerData state
                                            setPf(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='Vc' className='p-2 text-md' value='Vc' />
                                    <input id='vc' name='vc' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.vc || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, vc: e.target.value }); // Update registerData state
                                            setvc(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='Sd' className='p-2 text-md' value='Sd' />
                                    <input id='sd' name='sd' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.sd || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, sd: e.target.value }); // Update registerData state
                                            setsd(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='document' className='p-2 text-md' value='Document' />
                                    <input id='document' name='document' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={registerData.document || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, document: e.target.value }); // Update registerData state
                                            setdoc(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='LI' className='p-2 text-md' value='Li' />
                                    <input id='li' name='li' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.li || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, li: e.target.value }); // Update registerData state
                                            setli(e.target.value)
                                        }}
                                    />
                                </div>

                            </div>

                            <div className='flex justify-between mx-5'>

                                <div className='flex flex-col'>
                                    <Label htmlFor='Other' className='p-2 text-md' value='Other' />
                                    <input id='other' name='other' type='text' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' value={registerData.other || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, other: e.target.value }); // Update registerData state
                                            setOther(e.target.value); // Update addData state
                                        }} />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='deduction' className='p-2 text-md' value='Total Deduction *' />
                                    <input id='deduction' name='deduction' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' required value={!tdid ? registerData.deduction : tdid || ""} disabled onChange={(e) => setdid(e.target.value)} />
                                </div>
                                <div className='flex flex-col'>

                                    <Label htmlFor='netdesb' className='p-2 text-md' value='Net Disbursment *' />
                                    <input id='netdesb' name='netdesb' className='w-[160px] h-8 bottom-1 rounded-md items-center py-1' type='text' value={!deductionAmount ? registerData.netdesb : deductionAmount || ""} required />
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='rStatus' className='p-2 text-md' value='RTO Status *' />
                                    <Select id='rStatus' name='rStatus' value={registerData.rStatus || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, rStatus: e.target.value }); // Update registerData state
                                            // Update addData state
                                        }}>
                                        <option value=''>RTO Status</option>
                                        <option value='In Process'>In Process</option>
                                        <option value='Completed'>Completed</option>
                                        <option value='Hold'>Hold</option>
                                    </Select>
                                </div>
                                <div className='flex flex-col'>
                                    <Label htmlFor='lType' className='p-2 text-md' value='Loan Type *' />
                                    <Select id='lType' name='lType' className='w-[200px]' value={registerData.lType || ''}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, lType: e.target.value });
                                            setLoanType(e.target.value)
                                        }}>

                                        <option value=''>Loan Type</option>
                                        <option value='New Car'>New Car</option>
                                        <option value='Purchase'>Purchase</option>
                                        <option value='Refinance'>Refinance</option>
                                        <option value='BT Top Up'>BT To Up</option>
                                    </Select>
                                </div>

                            </div>

                            {(registerData.lType === 'New Car' || loanType === 'New Car') && (
                                <>
                                    <div className='flex gap-20'>
                                        <div className='flex flex-col ml-5'>
                                            <Label htmlFor='newCarDetails' className='p-1 text-md' value='Show Room Name' />
                                            <input
                                                id='sname'
                                                name='sname'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.sname || ''}
                                                onChange={(e) => { setRegisterData({ ...registerData, sname: e.target.value }) }}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='newCarDetails' className='p-1 text-md' value='New Car Details' />
                                            <input
                                                id='newCarD'
                                                name='newCarD'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.newCarD || ''}
                                                onChange={(e) => { setRegisterData({ ...registerData, newCarD: e.target.value }) }}
                                            />
                                        </div>
                                    </div>

                                </>
                            )}

                            {(registerData.lType === 'Purchase' || loanType === 'Purchase') && (
                                <>
                                    <div className='flex flex-wrap gap-10 mx-5'>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='pbank' className='p-1 text-md' value='Prev Bank Name' />
                                            <input
                                                id='ppBank'
                                                name='ppBank'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.ppBank || ''}
                                                onChange={(e) => { setRegisterData({ ...registerData, ppBank: e.target.value }) }}
                                            />
                                        </div>
                                        <div className='flex flex-col'>

                                            <Label htmlFor='rHold' className='p-1 text-md' value='RTO Hold' />
                                            <input
                                                id='prHold'
                                                name='prHold'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.prHold || '' }
                                                onChange={(e) =>{ setRegisterData({...registerData, prHold: e.target.value})
                                                    setFRHold(e.target.value)}}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='fc' className='p-1 text-md' value='FC Amount' />
                                            <input
                                                id='pfc'
                                                name='pfc'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.pfc || ''}
                                                onChange={(e) => { 
                                                    setRegisterData({...registerData, pfc:e.target.value})
                                                     setFFc(e.target.value)}}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Label htmlFor='noc' className='p-1 text-md' value='Noc ' />
                                            <input
                                                id='pnoc'
                                                name='pnoc'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.pnoc || ''}
                                                onChange={(e) => setFNoc(e.target.value)}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label htmlFor='PoAmount' className='p-1 text-md' value='Other Amount' />
                                            <input
                                                id='PoAmount'
                                                name='PoAmount'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.PoAmount || ''}
                                                onChange={(e) =>{
                                                    setRegisterData({...registerData, PoAmount: e.target.value})
                                                    setFOtherAmount(e.target.value)}}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Label htmlFor='rtoCharges' className='p-1 text-md' value='RTO Charges' />
                                            <input
                                                id='prtoCharges'
                                                name='prtoCharges'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.prtoCharges || ''}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, prtoCharges: e.target.value})
                                                    setFRCharges(e.target.value)}}
                                            />
                                        </div>

                                        <div className='flex flex-col '>
                                            <Label htmlFor='customerPay' className='p-1 text-md' value='Customer Pay' />
                                            <input
                                                id='pcustomerPay'
                                                name='pcustomerPay'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={!purchaseCustomerPay ? registerData.pcustomerPay : purchaseCustomerPay || 0 }
                                              
                                            />
                                        </div>




                                        <div className='flex flex-col '>
                                            <Label htmlFor='rtoAgent' className='p-1 text-md' value='Rto Agent' />
                                            <input
                                                id='prtoAgent'
                                                name='prtoAgent'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.prtoAgent || ''}
                                                onChange={(e) => setRegisterData({...registerData, prtoAgent:e.target.value})}


                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label htmlFor='pkiaharas' className='p-1 text-md' value='Kiharas' />
                                            <input
                                                id='pkiharas'
                                                name='pkiharas'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value= {registerData.pkiharas || ""}
                                                onChange = {(e)=> setRegisterData({...register, pkiharas:e.target.value})}
                                            />
                                        </div>


                                    </div>
                                </>
                            )}

                            {/* Refinance */}
                            {(registerData.lType === 'Refinance' || loanType === 'Refinance') && (
                                <>
                                    <div className='flex flex-wrap gap-10 m-5'>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='pbank1' className='p-1 text-md' value='Prev Bank Name' />
                                            <input
                                                id='rpBank1'
                                                name='rpBank1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rpBank1 || ''}
                                                onAbort={(e)=> setRegisterData({...registerData, rpBank1: e.target.value})}
                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Label htmlFor='noc1' className='p-1 text-md' value='Noc' />
                                            <input
                                                id='rnoc1'
                                                name='rnoc1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rnoc1 || ""}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, rnoc1: e.target.value});
                                                    setRNoc(e.target.value)}}
                                            />
                                        </div>




                                        <div className='flex flex-col '>
                                            <Label htmlFor='fc1' className='p-1 text-md' value='FC Amount' />
                                            <input
                                                id='rfc1'
                                                name='rfc1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rfc1 || ""}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, rfc1: e.target.value});
                                                    setRFc(e.target.value)
                                                }}
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label htmlFor='rHold1' className='p-1 text-md' value='RTO Hold' />
                                            <input
                                                id='rrHold1'
                                                name='rrHold1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rrHold1 || ""}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, rrHold1: e.target.value});
                                                    setRRhold(e.target.value)}}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='rtoCharges1' className='p-1 text-md' value='RTO Charges' />
                                            <input
                                                id='rrtoCharges1'
                                                name='rrtoCharges1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rrtoCharges1 || ""}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, rrtoCharges1: e.target.value});
                                                    setRRhold(e.target.value)}}                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='rOtherAmount' className='p-1 text-md' value='Other Amount' />
                                            <input
                                                id='rOtherAmount'
                                                name='rOtherAmount'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rOtherAmount || ""}
                                                onChange={(e) =>{ 
                                                    setRegisterData({...registerData, rOtherAmount: e.target.value});
                                                    setRRhold(e.target.value)}}                                               />
                                        </div>


                                        <div className='flex flex-col '>
                                            <Label htmlFor='rcustomerPay' className='p-1 text-md' value='Customer pay' />
                                            <input
                                                id='rcustomerPay1'
                                                name='rcustomerPay1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                               value={!refinenceCustomerPay ? registerData.rcustomerPay1 : refinenceCustomerPay || 0}
                                            />
                                        </div>


                                        <div className='flex flex-col '>
                                            <Label htmlFor='rrtoagent1' className='p-1 text-md' value='RTO Agent' />
                                            <input
                                                id='rrtoAgent1'
                                                name='rrtoAgent1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rrtoAgent1 || ""}
                                                onChange={(e) => setRegisterData({...registerData, rrtoAgent1: e.target.value})}
                                            />
                                        </div>

                                        <div className='flex flex-col '>
                                            <Label htmlFor='kiharas1' className='p-1 text-md' value='Kiharas' />
                                            <input
                                                id='rkiharas1'
                                                name='rkiharas1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.rkiharas1 || ""}
                                                onChange={(e) => setRegisterData({...registerData, rkiharas1: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* BT TOP UP */}
                            {(registerData.lType === 'BT Top Up' || loanType === 'BT Top Up') && (
                                //   const [bRCharges, setBRCharges] = useState(0);
                                //   const [bRHold, setBRHold] = useState(0);
                                //   const [bFc, setBFc] = useState(0);
                                //   const [bOtherAmount, setBOtherAmount] = useState(0);
                                //   const [bNoc, setBNoc] = useState(0);
                                <>
                                    <div className='flex flex-wrap gap-10 ml-5'>

                                        <div className='flex flex-col '>
                                            <Label htmlFor='pBank1' className='p-1 text-md' value='Prev Bank' />
                                            <input
                                                id='bpBank1'
                                                name='bpBank1'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.bpBank1 || ''}
                                                onChange={(e)=> setRegisterData({...registerData, bpBank1: e.target.value})}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='bnoce' className='p-1 text-md' value='NOC' />
                                            <input
                                                id='bnoc'
                                                name='bnoc'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.bnoc || ''}
                                                onChange={(e)=>{ setRegisterData({...registerData, bnoc: e.target.value})
                                                setBNoc(e.target.value)
                                            }}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='fc2' className='p-1 text-md' value='FC' />
                                            <input
                                                id='bfc2'
                                                name='bfc2'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.bfc2 || ''}
                                                onChange={(e)=>{ setRegisterData({...registerData, bfc2: e.target.value})
                                                setBFc(e.target.value)}}                                            />
                                        </div>
                                        <div className='flex flex-col'>
                                            <Label htmlFor='oAmount' className='p-1 text-md' value='Other Amount' />
                                            <input
                                                id='boAmount'
                                                name='boAmount'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.boAmount || ''}
                                                onChange={(e)=>{ setRegisterData({...registerData, boAmount: e.target.value})
                                                setBOtherAmount(e.target.value)}}        
                                            />
                                        </div>

                                        <div className='flex flex-col'>
                                            <Label htmlFor='rHold2' className='p-1 text-md' value='Rto Hold' />
                                            <input
                                                id='brHold2'
                                                name='brHold2'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.brHold2 || ''}
                                                onChange={(e)=>{ setRegisterData({...registerData, brHold2: e.target.value})
                                                setBRHold(e.target.value)}}   
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='rtoCharges2' className='p-1 text-md' value='RTO Charges' />
                                            <input
                                                id='brtoCharges2'
                                                name='brtoCharges2'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.brtoCharges2 || ''}
                                                onChange={(e)=>{ setRegisterData({...registerData, brtoCharges2: e.target.value})
                                                setBRCharges(e.target.value)}}                                               />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='customerPay2' className='p-1 text-md' value='Customer Pay' />
                                            <input
                                                id='bcustomerPay2'
                                                name='bcustomerPay2'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                disabled

                                                value={!btTopUpCustomerPay ? registerData.bcustomerPay2 : btTopUpCustomerPay || 0}

                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='rAgent' className='p-1 text-md' value='RTO Agent' />
                                            <input
                                                id='brAgent'
                                                name='brAgent'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.brAgent || ''}
                                                onChange={(e)=> setRegisterData({...registerData, brAgent: e.target.value})}
                                            />
                                        </div>
                                        <div className='flex flex-col '>
                                            <Label htmlFor='kiharas2' className='p-1 text-md' value='Kiharas' />
                                            <input
                                                id='bkiharas2'
                                                name='bkiharas2'
                                                type='text'
                                                className='w-[350px] h-8 bottom-1 rounded-md items-center py-1'
                                                value={registerData.bkiharas2 || ''}
                                                onChange={(e)=> setRegisterData({...registerData, bkiharas2: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </>

                            )}
                              <div className='flex justify-center items-center'>
                            <button className='text-white bg-black text-center px-3 py-2 hover:bg-blue-700 rounded-lg' type='submit'>Update</button>
                            </div>
                        </form>

                      
                      
                            


                    </div>
                ) : (
                    <div className='flex flex-col p-4'>
                        <h2>Please select a loan application to update.</h2>
                    </div>
                )
                }

<Modal show={succModal} size='md' onClose={() => setSuccModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className='text-center'>
                            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
                            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                                Your Register has updated                   </h3>
                            <div className='flex justify-center gap-4'>
                                <Button color='success' onClick={() => setSuccModal(false)}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    )
}

export default UpdateRegister
