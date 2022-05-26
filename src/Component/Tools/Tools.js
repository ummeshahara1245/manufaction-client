import { createBrowserHistory } from 'history';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tools = () => {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tool')
            .then(res => res.json())
            .then(data => setTools(data))
    })
    const history = createBrowserHistory();

    const handleBooking = id => {
        history.push(`/purchase/${id}`)
    }
    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }} className='pt-20'>
            <h2 className='text-3xl font-semibold text-center'>Latest Tools</h2>
            <div className='md:grid-cols-2 grid-cols-1 grid lg:grid-cols-4'>
                {
                    tools.slice(-6,).reverse().map(tool =>
                        <div className="max-w-lg bg-white dark:bg-gray-800 border-gray-500 m-3 items-center justify-center border" key={tool?._id}>
                            <div className="px-5 pb-5">
                                <div style={{ height: '200px', width: '200px' }} className=' object-contain object-center select-none'>
                                    <img className="p-4 mx-auto" src={tool?.image} alt="product" />
                                </div>
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{tool?.name}</h5>

                                <h5 className="text-xl  tracking-tight text-gray-900 dark:text-white">{tool?.short_description.slice(0, 55)}...</h5>
                                <span className="text-xl font-semibold text-gray-900 dark:text-white"> Quantity: {tool?.available_quantity}</span>
                                <br />
                                <span className="text-lg font-medium text-gray-900 dark:text-white">Minimum Order Quantity: {tool?.minimum_order_quantity}</span>
                                <div className="flex justify-between items-center mt-4">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white ">$ {tool?.price}.00</span>
                                    <Link to={`/purchase/${tool?._id}`} onClick={() => handleBooking(tool?._id)} className="text-white bg-blue-700 hover:bg-white hover:border-blue-800 border hover:text-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-white dark:focus:ring-blue-800">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default Tools;