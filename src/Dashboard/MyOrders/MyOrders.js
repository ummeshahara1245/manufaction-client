import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyOrders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://boomer-herokuserver.herokuapp.com/order?email=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    console.log('response :', res)

                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('accessToken');
                        navigate('/')

                    }
                    return res.json()
                })
                .then(data => {

                    setOrders(data)
                });
        }
    }, [user])

    return (
        <div style={{ fontFamily: 'Poppins, sans-serif' }}>
            <h2 className='text-center text-2xl font-semibold mb-2'>My orders: {orders.length}</h2>
            <div className="overflow-x-hidden">
                <table className="table lg:w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Tool</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => <tr key={order?._id}>
                            <th>{index + 1}</th>
                            <td>{order?.date}</td>
                            <td>{order?.tool_name}</td>
                            <td>{order?.quantity}</td>
                            <td>$ {parseInt(order?.price * order?.quantity)}</td>
                            <td>***{order?.phone.slice(6, 11)}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;