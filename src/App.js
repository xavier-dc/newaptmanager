import './App.css'
import React, { Component } from 'react';
//import myData from './json/tenants.json'
import SocialCard from './SocialCard';
import TenantTool from './TenantTool';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myData: {},
      users: [],
      allUsers: [],
      style: 'card white',
      packages: [],
    };
    this.removeCaller = this.removeCaller.bind(this);   
    this.changePackage = this.changePackage.bind(this);
    this.addTenant = this.addTenant.bind(this);
    this.syncCallers = this.syncCallers.bind(this);
  }
  
  async componentDidMount() {
    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const callers = await this.syncCallers();
    this.setState({ myData: callers });
    this.setState({ users: Array.from(callers.tenants)});
    this.setState({ allUsers: Array.from(callers.tenants) });
    // window.open()
    //window.open("http://localhost:5000/tenants", "_blank", 'resizable=1,scrollbars=1,fullscreen=0,height=200,width=' + width + '  , left=' + left + ', toolbar=0, menubar=0,status=1');
  };

  //NOTES: Display all unit numbers, keep names hidden in all cards, when filtering names, be able to select if they have a package or not
  //then update the corresponding unit number. Have a side panel that can act as an address list and be able to select
  //save and recall timestamps of when packages are delivered and picked up.

  removeCaller(e) {
    this.state.allUsers.forEach(key => {
        if (this.state.allUsers[key] === e) {
          console.log("removing: " + this.state.allUsers[key]);
        }
    })
  }

  async syncCallers() {
    const callers = await fetch('http://localhost:5001/tenants')
      .then(response => response.json())
      .catch(err => console.error(err));
    return callers;
  }

  changePackage(id) {
    this.state.myData.tenants.forEach(tenant => {
      if (tenant.name === id.name && tenant.package !== undefined) {
        fetch(`http://localhost:5001/update/${tenant.name}`, {
          'method': 'POST',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': '*',
            },
            'body': JSON.stringify(tenant)
        }).then(response => response.json())
        .then(data => {this.setState({myData: data}); this.setState({users: Array.from(data)}); this.setState({myUsers: Array.from(data)})})
        .catch(err => console.log(err));
      }
    })
  }

  addTenant(tenant) {
    fetch(`http://localhost:5001/add`, {
      'method': 'POST',
      'headers': {
        "Content-Type" : "application/json",
        "Origin": "http://localhost:3000",
        'Accept': '*',
      },
       'body': JSON.stringify(tenant)
    }).then(response => response.json())
    .then(data => this.setState({myData: data}))
    .catch(err => console.log(err))
  }

  render() {

  const setCallers = (data) => {
    this.setState({ myData: data });
    this.setState({ users: Array.from(data.tenants)});
    this.setState({ allUsers: Array.from(data.tenants)});
  }
  // this.setState({ myData: callers });
  // this.setState({ users: Array.from(this.state.myData.tenants)});
  // this.setState({ allUsers: this.state.users });

  const MakeCallersUpdate = async(caller) => {
    this.changePackage(caller);
    var getCallers = await this.syncCallers();
    getCallers ? setCallers(getCallers) : prompt("could not get callers, please refresh");
  }

  const filterCards = event => {
      const value = event.target.value.toLowerCase();
      const filteredUsers = this.state.allUsers.filter(
        user => (`${user.name} ${user.unit}`.toLowerCase()
        .includes(value))
      );
      this.setState({ users: filteredUsers });
    }

  const filterTool = event => {
    const value = event.target.value
    console.log(value);
  }

  // const changeInformation = (target, value) => {
  //   target = value;
  //   this.setState({myData: {...this.state.myData.tenants, target}})
  // }

    return (
      <div className="App">
        <input className="search-box" placeholder="Search..." onInput={filterCards}/>

        <div className="tenantTool">
          <TenantTool filter={filterTool} add={this.addTenant}/>
        </div>

        <div className="cards-container">
          {this.state.users.map((user, index) => (
            <SocialCard userdata={user} key={index} package={user.package} style={this.state.style} handleColorChange={MakeCallersUpdate} forceUpdate={this.forceUpdate} removeCaller={this.removeCaller}/>
          ))}
          </div>
      </div>
    );
  }
}