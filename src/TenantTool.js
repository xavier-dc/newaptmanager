import React from 'react';
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
        
    const handleChange = (event) => {
        event.preventDefault();
        this.setState({typedName: event.target.value})
    }

    const handleChange2 = (event) => {
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

        //remove tenant tenantJSON.name from unit tenantJSON.unit
        //TODO
    }
        
    const AddTenant = async () => {
        let tenantJSON = {}
        tenantJSON.name = this.state.typedName;
        tenantJSON.unit = this.state.typedUnit;
        console.log("new tenant ", tenantJSON);

        addTenant(tenantJSON);
    }
    
    return (
            <div>
            <label>Tenant Name <br></br>
            <input name="tenantName" onInput={handleChange}></input>
            </label>
            <br></br>

            <label>Tenant Unit <br></br>
            <input name="tenantUnit" onInput={handleChange2}></input>
            </label>

            <button onClick={AddTenant}>Add</button>
            <button onClick={RemoveTenant}>Remove</button>
            </div>
        );
    };
}