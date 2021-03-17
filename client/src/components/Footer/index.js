import React from 'react'
import footerImg from '../../images/footer.jpg';
import logo from '../../images/logo.svg';

function Footer() {
    return (
        <>
            <footer className="footer">
                <h2>No more takeouts</h2>
                <img className="logo" src={logo} alt="" />

            </footer>
        </>
    )
}

export default Footer
