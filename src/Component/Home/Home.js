import React from 'react';
import Banner from '../Banner/Banner';
import Newsletter from '../Newsletter/Newsletter';
import Stats from '../Stats/Stats';
import Tools from '../Tools/Tools';

const Home = () => {
    return (
        <div>
            <Banner />
            <Tools />
            <Stats />
            <Newsletter />
        </div>
    );
};

export default Home;