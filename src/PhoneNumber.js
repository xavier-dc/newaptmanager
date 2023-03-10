import './PhoneNumber.css'
import React from 'react'

const PhoneNumber = ({ number, type}) => {

    return (
    <div className="phoneNumber">
        <p>{type}: {number}</p>
    </div>
    )
}

export default PhoneNumber;