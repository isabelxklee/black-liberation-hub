import React, { Component } from 'react'
import OrgTile from './OrgTile.jsx'


class OrganizationContainer extends Component {
 render() {
    let orgsArr = this.props.orgs.map((org) => {
      return <OrgTile key={org.id} org={org}/>
    })

    return (
      <>
        <div className="org-container">
          {orgsArr}
        </div>
      </>
    )
  }
}

export default OrganizationContainer