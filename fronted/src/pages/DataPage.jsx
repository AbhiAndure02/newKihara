import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DataPage = () => {
    const { slug } = useParams(); // Destructure the slug parameter
    const [registerData, setRegisterData] = useState(null); // State to store the product data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const getRegiData = async () => {
            try {
                console.log(`Fetching product with slug: ${slug}`);
                const res = await axios.get(`/api/getregister?slug=${slug}`);
                console.log('Response data:', res.data);

                // Assuming your API returns a single item array for the specific slug
                if (res.data.registerData && res.data.registerData.length > 0) {
                    // Check if the slug in the response matches the requested slug
                    const filteredData = res.data.registerData.find(item => item.slug === slug);
                    if (filteredData) {
                        setRegisterData(filteredData); // Store the correct entry
                    } else {
                        setError('No products found for this slug');
                    }
                } else {
                    setError('No products found for this slug');
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
        return <p>Loading...</p>; // Show loading indicator while data is being fetched
    }

    return (
        <div className='w-full h-screen flex justify-center bg-[#1974A6]'>
            {error && <p>{error}</p>} {/* Show error message if any */}
            {registerData ? ( // Check if registerData is not null
                <div className='w-[70%] mt-16 p-6 rounded-md text-md font-sans opacity-95 h-fit shadow-lg shadow-blue-400 bg-white'>
                    <div className='flex flex-wrap gap-10'>
                    <p>Name :{registerData.name}</p>
                    <p>Number: {registerData.number}</p>
                    <p>Vehicle Number: {registerData.rNumber}</p>
                    <p>Vehicle Name: {registerData.vName}</p>


                    <p>Loan Type: {registerData.lType}</p>

                    {
                        registerData.lType === 'Purchase' ? (
                            <>
                            <p>RTO Charges: {registerData.prtoCharges}</p>
                            <p>RTO Agent : {registerData.prtoAgent}</p>
                            <p>Kiharas : {registerData.pkiharas}</p>
                            <p>Customer Pay: {registerData.pcustomerPay}</p>
                            <p>RTO Hold: {registerData.prHold}</p>
                            <p>NOC Hold: {registerData.pnoc}</p>
                            <p>Prve Bank: {registerData.ppBank}</p>
                            <p>Net Pay To:{registerData.pnpt}</p>
                            <p>FC Amount:{registerData.pfc }</p>
                            </>
                        ):
                        null
                    }


                    {
                        registerData.lType === 'BT Top Up' ? (
                            <>
                            <p>RTO Charges: {registerData.brtoCharges2}</p>
                            <p>RTO Agent : {registerData.brAgent}</p>
                            <p>Kiharas : {registerData.bkiharas2}</p>
                            <p>Customer Pay: {registerData.bcustomerPay2}</p>
                            <p>RTO Hold: {registerData.brHold2}</p>
                            <p>Other Amount: {registerData.boAmount}</p>
                            <p>Prve Bank: {registerData.bpBank1}</p>
                            <p>FC Amount:{registerData.bfc2 }</p>
                            </>

                        ):
                        null
                    }
                           {
                        registerData.lType === 'New Car' ? (
                            <>
                            <p>Show Room Name: {registerData.sname}</p>
                            <p>Car Details : {registerData.newCarD}</p>
                          
                            </>

                        ):
                        null
                    }

                    {
                        registerData.lType === 'Refinace' ? (
                            <>
                            <p>RTO Charges: {registerData.rrtoCharges1}</p>
                            <p>NOC : {registerData.rnoc1}</p>
                            <p>Customer pay: {registerData.rcustomerPay1}</p>
                            <p>FC Amount:{registerData.rfc1 }</p>
                            <p>Prve Bank: {registerData.rpBank1}</p>
                            <p>RTO Hold: {registerData.rrHold1}</p>
                            <p>Kiharas: {registerData.rkiharas1}</p>


                            </>
                        ):
                        null
                    }








                    {/* <p>Loan Amount: {registerData.lAmount}</p>
                    <p>Net Disbursion: {registerData.nets}</p>
                    <p>Status: {registerData.rStatus}</p>
                    <p>RTO Charges: {registerData.rtoCharges}</p>
                    <p>Loan Type: {registerData.lType}</p>
                    <p>Loan Amount: {registerData.lAmount}</p>
                    <p>Net Disbursion: {registerData.nets}</p>
                    <p>Status: {registerData.rStatus}</p>
                    <p>RTO Charges: {registerData.rtoCharges}</p>   
                    <p>Loan Type: {registerData.lType}</p>
                    <p>Loan Amount: {registerData.lAmount}</p>
                    <p>Net Disbursion: {registerData.nets}</p>
                    <p>Status: {registerData.rStatus}</p>
                    <p>RTO Charges: {registerData.rtoCharges}</p>     
                    <p>Loan Type: {registerData.lType}</p>
                    <p>Loan Amount: {registerData.lAmount}</p>
                    <p>Net Disbursion: {registerData.nets}</p>
                    <p>Status: {registerData.rStatus}</p>
                    <p>RTO Charges: {registerData.rtoCharges}</p>                           */}
                     </div>
                     <div className='w-full flex justify-center items-center'>
                     <button className='mt-10 text-xl bg-black px-5 py-2 rounded-md text-white'>Update</button>
                     </div>
                     

                </div>
            ) : (
                <p>No data found</p>
            )}
        </div>
    );
}

export default DataPage;
