import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


const DataPage = () =>{

    const { slug } = useParams(); // Destructure the slug parameter
    const [register, setRegister] = useState(null); // State to store the product data
    const [loading, setLoading] = useState(true); // State to handle loading state
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const getRegiData = async () => {
            try {
                console.log(`Fetching product with slug: ${slug}`); // Debugging log
                const res = await axios.get(`/api/getregister?slug=${slug}`); // Await the Axios request
                console.log('Response data:', res.data); // Debugging log for response data
                
                if (res.data.registerData && res.data.registerData.length > 0) {
                    setRegister(res.data.registerData[0]); 
                    console.log(register)// Extract the first product from the array
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Error fetching the product:', error);
                setError('Failed to fetch product details'); // Set error state
            } finally {
                setLoading(false); // Set loading state to false
            }
        };
        getRegiData();
    }, [slug]);


  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      {
        register ? (
            <>
            <p>{register.name}</p>
            <p>{register.number}</p>
            <p>{register.lType}</p>
            <p>{register.lAmount}</p>
            <p> netDisbursion : {register.netDistribution}</p>

            <p>Status: {register.rStatus}</p>

            <p>RTO charges : {register.rtoCharges}</p>


            </>
        )
        :
        <p>no data found</p>
      }
    </div>
  )
}

export default DataPage
