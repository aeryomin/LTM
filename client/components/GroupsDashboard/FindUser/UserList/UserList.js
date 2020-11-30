/* eslint-disable no-console */
import React, { useState } from 'react'
import SelectUserButton from './SelectUserButton'
import AddUserButton from './AddUserButton'

const UserList = (props) => {
  const { findResults: users } = props
  const [selectedUser, setSelectedUser] = useState({})

  return (
    <div className="flex flex-col max-h-full">
      {users.map((user) => {
        return (
          <div className="mx-2 mb-2 flex justify-between" key={user._id}>
            <SelectUserButton user={user} setSelectedUser={setSelectedUser} />
            {user._id === selectedUser._id && (
              <AddUserButton user={user} setIsFindUserShow={props.setIsFindUserShow} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default UserList
