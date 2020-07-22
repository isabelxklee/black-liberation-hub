import React, {Component} from 'react'
import {Route, withRouter } from 'react-router-dom'
import './App.css'
import {connect} from 'react-redux'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar.jsx'
import CreateAccount from './components/account-management/CreateAccount.jsx'
import Login from './components/account-management/Login.jsx'
import Profile from './components/account-management/Profile.jsx'
import Resources from './components/resources/ResourceContainer.jsx'
import ProfileOrg from './components/organizations/ProfileOrg.jsx'
import PoliceBrutalityTracker from './components/police-brutality/PoliceBrutalityTracker.jsx'
import About from './components/About.jsx'
import Footer from './components/Footer.jsx'
import Verify from './components/organizations/Verify.jsx'
import Nominate from './components/organizations/Nominate.jsx'
import Settings from './components/account-management/Settings.jsx'
import OtherProfile from './components/account-management/OtherProfile.jsx'

class App extends Component {

  componentDidMount() {
    fetch("http://localhost:3000/organizations")
    .then(r => r.json())
    .then((orgs) => {
      this.props.setAllOrganizations(orgs)
    })
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then((users) => {
      this.props.setAllUsers(users)
    })
    if (localStorage.token) {
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(this.handleResponse)
    }
  }

  handleResponse = (response) => {
    if (response.user) {
      localStorage.token = response.token
      this.props.setUserInfo(response)  
      this.props.history.push(`/profile`) 
    } else {
      alert(response.message)
    }
  }

  renderOrgRoutes = () => {
    let orgs = this.props.orgs
    let allRoutes = []
    allRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}`} key={org.id}> <ProfileOrg key={org.id} org={org}/> </Route>
    })
    return allRoutes
  }

  renderOrgEditRoutes = () => {
    let orgs = this.props.orgs
    let allEditRoutes = []
    allEditRoutes = orgs.map((org) => {
      return <Route exact path={`/organizations/${org.id}/edit`} key={org.id}> <Verify key={org.id} org={org}/> </Route>
    })
    return allEditRoutes
  }

  renderUserRoutes = () => {
    let users = this.props.users
    let allUsers = []
    allUsers = users.map((user) => {
      return <Route exact path={`/users/${user.username}`} key={user.id}> <OtherProfile key={user.id} user={user}/> </Route>
    })
    return allUsers
  }

  render () {
    return (
      <div className="app">
        <NavBar handleResponse={this.handleResponse}/>
        <Route exact path="/"> <Home/> </Route>
        <Route exact path="/police-brutality-tracker"> <PoliceBrutalityTracker/> </Route>
        <Route path="/resources"> <Resources/> </Route>
        <Route path="/create-account"> <CreateAccount handleResponse={this.handleResponse}/> </Route>
        <Route path="/login"> <Login handleResponse={this.handleResponse}/> </Route>
        <Route path="/about"> <About/> </Route>
        <Route path="/profile"> <Profile/> </Route>
        <Route path="/nominate"> <Nominate/> </Route>
        <Route path="/account-settings">
          <Settings
            id={this.props.id}
            username={this.props.username}
            email_address={this.props.email_address}
            created_at={this.props.created_at}
          />
        </Route>
        {this.renderOrgRoutes()}
        {this.renderUserRoutes()}
        {this.renderOrgEditRoutes()}
        <Footer/>
      </div>
    )  
  }
}

let setUserInfo = (response) => {
  return {
    type: "SET_USER_INFO",
    payload: response
  }
}

let setAllOrganizations = (orgs) => {
  return {
    type: "SET_ALL_ORGS",
    payload: orgs
  }
}

let setAllUsers = (users) => {
  return {
    type: "SET_ALL_USERS",
    payload: users
  }
}

let mapDispatchToProps = {
  setUserInfo: setUserInfo,
  setAllOrganizations: setAllOrganizations,
  setAllUsers: setAllUsers
}

let mapStateToProps = (globalState) => {
  return {
    id: globalState.userInformation.id,
    username: globalState.userInformation.username,
    email_address: globalState.userInformation.email_address,
    created_at: globalState.userInformation.created_at,
    token: globalState.userInformation.token,
    orgs: globalState.orgInformation.orgs,
    users: globalState.userInformation.users
  }
}

let MagicalComponent = withRouter(App)

export default connect(mapStateToProps, mapDispatchToProps)(MagicalComponent)