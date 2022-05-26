import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div style={{ fontFamily: 'Poippins,sans-serif' }} className="drawer drawer-mobile">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
            <div style={{ fontFamily: 'Poppins,sans-serif' }} className="drawer-content">
                <Outlet></Outlet>
            </div>
            <div style={{ fontFamily: 'Poppins,sans-serif' }} className="drawer-side">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    {admin &&
                        <>
                            <li><Link to='/dashboard/users'>All Users</Link></li>
                            <li><Link to='/dashboard/orders'>All Orders</Link></li>
                            <li><Link to='/dashboard/add-tool'>Add Tool</Link></li>
                            <li><Link to='/dashboard/manage-tool'>Manage Tools</Link></li>
                        </>
                    }

                    <li><Link to='/dashboard/review'>Add a review</Link></li>
                    <li><Link to='/dashboard/profile'>My profile</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;

