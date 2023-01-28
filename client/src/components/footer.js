import React from 'react';
import '../styles/footer.css';
const Footer = () => {
    return (
        <div className='footer'>
            <p className='lower'>Copyright Travel.com 2022 ©</p>
            <p className='lower'>Our partners</p>
            <div className='sponsors'>
                <img className='bottom' src='https://logos-world.net/wp-content/uploads/2021/02/British-Airways-Logo.png' />
                <img className='bottom' src='https://logos-world.net/wp-content/uploads/2020/03/Ryanair-Logo.png' />
            </div>
        </div>
    );
};

export default Footer;