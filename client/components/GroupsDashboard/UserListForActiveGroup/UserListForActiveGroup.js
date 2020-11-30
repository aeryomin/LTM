/* eslint-disable no-console */
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAuthenticatedUsers,
  setUsersFromActiveGroup,
  setSelectedUserID
} from '../../../redux/reducers/users'
import UserListTitle from './UserListTitle'
import SelectUserButton from './SelectUserButton'
import RemoveUserButton from './RemoveUserButton'
import AddUserButton from './AddUserButton'
import ui from '../../UI/config.ui'

const UserListForActiveGroup = (props) => {
  const dispatch = useDispatch()
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const { authenticatedUsers, usersFromActiveGroup, selectedUserID } = useSelector((s) => s.users)
  // const [selectedUserID, setSelectedUserID] = useState('')

  useEffect(() => {
    dispatch(getAuthenticatedUsers())
  }, [dispatch])

  useEffect(() => {
    const activeGroup = groupList.find((group) => group._id === activeGroupID)
    const usersFromSelectedGroup = authenticatedUsers.filter((user) =>
      activeGroup.usersID.includes(user._id)
    )
    dispatch(setUsersFromActiveGroup(usersFromSelectedGroup))
  }, [dispatch, authenticatedUsers, activeGroupID, groupList])

  return (
    <div
      className={`w-full  border rounded
        ${ui.groups.bgColor}
        ${ui.groups.bgOpacity}
        ${ui.groups.fontColor}`}
    >
      <UserListTitle groupList={groupList} activeGroupID={activeGroupID} />
      <div className="mx-2 flex flex-col h-custom-15vh border rounded overflow-y-scroll">
        {usersFromActiveGroup.map((user) => {
          return (
            <div className="mx-1 mt-1 flex space-x-0" key={user._id}>
              <SelectUserButton
                user={user}
                selectedUserID={selectedUserID}
                setSelectedUserID={setSelectedUserID}
              />
              {user._id === selectedUserID && (
                <div className="flex w-2/6 ml-2 space-x-2">
                  <RemoveUserButton selectedUserID={selectedUserID} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <AddUserButton
        isFindUserShow={props.isFindUserShow}
        setIsFindUserShow={props.setIsFindUserShow}
      />
    </div>
  )
}

export default UserListForActiveGroup
