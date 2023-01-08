import Address from './Address';
import './SocialCard.css'
import React from 'react';

const SocialCard = (props) => {
    let {userdata, removeCaller, handleColorChange} = props;

    const changeColor = () => {
        handleColorChange(props.userdata);
    }

    const removeTenant = (e) => {
        removeCaller(e);
    }
    
    // userdata.package === "P" ? style = "card gold" : style = "card white";

    return (
        <div className="cardContainer">
            <button id="removeTenant" value="remove" onClick={removeTenant(userdata.name)}>Remove</button>
            <div userdata={props.allUsers} className={userdata.package === "P" ? "card gold" : "card white"} onClick={changeColor} >
                <br></br>
                <div className="card__title">
                    {userdata.name !== undefined ? Array.from(userdata.name).map(e => e) : 'Name not found'}
                </div>
                    {/* <p>{userdata.email}</p> */}
                <div className="card__body">
                    <Address address={userdata.unit}/>
                    <Address delivery={userdata.package}/>
                    {/* <div className="card__image"><img src={userdata.picture.medium} alt=""></img></div> */}
                </div>
            </div>
        </div>
    );
};

export default SocialCard;