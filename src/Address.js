import React from 'react';

const Address = ({ address, delivery }) => {
 return (
     <div className="address">
         <h4>{address}</h4>
         <p>{delivery}</p>
     </div>
 )
}

export default Address;