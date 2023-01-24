import Address from './Address';
import './SocialCard.css';
import React from 'react';

const SocialCard = (props) => {
    let {userdata, handleColorChange} = props;
    const [popUp, setPopUp] = React.useState(false);

    const updateUserPackage = (data) => {
        handleColorChange(props.userdata, data, 'store');
    }

    const removeUserPackage = (data) => {
        console.log(`removing package: ${data}`);
        handleColorChange(props.userdata, data, 'remove');
    }

    // const removeTenant = (e) => {
    //     removeCaller(e);
    // }

    const PopUpSelect = () => {
        return <div className="row mx-3">
            <input type="button" onClick={() => updateUserPackage('P')} value="P"/>
            <input type="button" onClick={() => updateUserPackage('L')} value="L" />
            <input type="button" onClick={() => updateUserPackage('R')} value="R" />
        </div>
    }

    return (
        <div className="cardContainer">
            {/* <button id="removeTenant" value="remove" onClick={removeUserPackage(userdata.package)}>Remove</button> */}
            <div userdata={props.allUsers} className={userdata.package === "" ? "card white" : "card gold"} onClick={() => {console.log(popUp); setPopUp(prevState => !prevState)}}>
                <br></br>
                <div className="card__title">
                    {userdata.name !== undefined ? Array.from(userdata.name).map(e => e) : 'Name not found'}
                </div>
                    {/* <p>{userdata.email}</p> */}
                <div className="card__body">
                    <Address address={userdata.unit}/>
                    <Address removeUserPackage={removeUserPackage} delivery={userdata.package} />
                    {popUp ? <PopUpSelect/> : ''}
                    {/* <div className="card__image"><img src={userdata.picture.medium} alt=""></img></div> */}
                </div>
            </div>
        </div>
    );
};

export default SocialCard;