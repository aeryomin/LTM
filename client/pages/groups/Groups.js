/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../../components/Header/Header'
import GroupsDashboard from '../../components/GroupsDashboard/GroupsDashboard'

const Groups = () => {
  const { user } = useSelector((s) => s.auth)

  return (
    <div className="relative w-screen h-screen bg-custom-groups bg-cover md:max-w-screen-md md:mx-auto">
      <Header name={user.username} />
      <GroupsDashboard />
    </div>
  )
}

Groups.propTypes = {}

export default Groups
