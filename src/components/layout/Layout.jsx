// import React from 'react'
import PropTypes from 'prop-types';
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

const Layout = ({children}) =>{
    return(
        <div>
            <Navbar />
            <div className="content">
                {children}
            </div>
            <Footer />
        </div>
        
    )
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default Layout;
