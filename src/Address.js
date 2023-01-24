import React from 'react';
import './Address.css';

const Address = ({ address, delivery, removeUserPackage }) => {
 return (
     <div className="address">
        <h4>{address}</h4>
        {delivery ? delivery.split("").map(e => 
            <p className="recievedPackage" onClick={() => {removeUserPackage(e)}}>{e}</p>
        ) : ''}
     </div>
 )
}

export default Address;