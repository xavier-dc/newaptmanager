import React from 'react';
import './TenantTool.css';
// import { writeJsonFile } from 'write-json-file';

export default class TenantTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typedName : '',
            typedUnit: ''
        }
    }
    render () {
    // let typedValueName = ""
    // let typedValueUnit = ""
        
    const handleNameChange = (event) => {
        event.preventDefault();
        this.setState({typedName: event.target.value})
    }

    const handleUnitChange = (event) => {
        event.preventDefault();
        this.setState({typedUnit: event.target.value});
    }

    const addTenant = (data) => {
        console.log(JSON.stringify(data));

        fetch('http://localhost:5001/add', 
        {
            'method': 'POST',
            'mode': 'cors',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': '*',
            },
            'body': JSON.stringify(data),
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    const RemoveTenant = async() => {
        //create JSON with tenant name and unit # return error if empty
        let tenantJSON = {};
        tenantJSON.name = this.state.typedName;
        tenantJSON.unit = this.state.typedUnit;
        console.log(`removing tenant => ${tenantJSON.name} at unit ${tenantJSON.unit}`);

        //TODO: remove tenant tenantJSON.name from unit tenantJSON.unit

        //TODO: Check the system for the name specified, then if there is a match, remove the tenant from the unit, otherwise return an error
    }
        
    const AddTenant = async () => {
        let tenantJSON = {}
        const verifyCredentials = [
            this.state.typedName !== "",
            this.state.typedUnit !== "",
            this.state.typedName !== undefined,
            this.state.typedUnit !== undefined,
        ]

        let credentialsVerified = true;

        verifyCredentials.forEach(cred => {
            if (cred === false) { 
                console.error(`verification failed at ${verifyCredentials.toString()}`);
            }
        })

        if (credentialsVerified === true) {
            tenantJSON.name = this.state.typedName;
            tenantJSON.unit = this.state.typedUnit;
            addTenant(tenantJSON);
        } else {
            console.error(`credentials could not be verified, please fix errors and try again.`);
        }
    }
    
    return (
            <div>
            <label>Tenant Name <br></br>
            <input name="tenantName" onInput={handleNameChange}></input>
            </label>
            <br></br>

            <label>Tenant Unit <br></br>
            <input name="tenantUnit" onInput={handleUnitChange}></input>
            </label>
            <br></br>

            <div className="center">
                <button onClick={AddTenant}>Add</button>
                <button onClick={RemoveTenant}>Remove</button>
            </div>
            </div>
        );
    };
}