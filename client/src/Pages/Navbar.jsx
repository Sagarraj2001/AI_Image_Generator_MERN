import React from 'react'

function Navbar() {
    return (
        <>
            <nav
                className="navbar navbar-expand-lg"
                style={{
                    backgroundColor: '#041E42',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                }}>
                <div className="container-fluid d-flex justify-content-center">
                    <a className="navbar-brand text-white fw-bold fs-3" href="#">Imagine<span style={{color:"#B0E0E6"}}>.AI</span></a>
                </div>
            </nav>


        </>
    )
}

export default Navbar
