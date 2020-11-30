/* eslint-disable no-console */
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGrouplist } from '../../redux/reducers/groups'
import FindUser from './FindUser/FindUser'
import GroupList from './GroupList/GroupList'
import CreatGroup from './CreatGroup/CreatGroup'
import UserListForActiveGroup from './UserListForActiveGroup/UserListForActiveGroup'

const GroupDashboard = () => {
  const dispatch = useDispatch()
  const { user: currentUser } = useSelector((s) => s.auth)
  const { groupList, activeGroupID } = useSelector((s) => s.groups)
  const [isCreateGroupShown, setIsCreateGroupShown] = useState(false)
  const [isFindUserShow, setIsFindUserShow] = useState(false)

  const activeGroup = groupList.find((group) => group._id === activeGroupID)

  useEffect(() => {
    dispatch(getGrouplist())
  }, [dispatch])

  return (
    <div>
      <div className="mx-2 my-4 flex flex-col space-y-4">
        <GroupList
          groupList={groupList}
          currentUser={currentUser}
          activeGroupID={activeGroupID}
          isCreateGroupShown={isCreateGroupShown}
          setIsCreateGroupShown={setIsCreateGroupShown}
        />
        {activeGroupID !== '' && activeGroup.creatorID === currentUser._id && (
          <div className="w-full">
            <UserListForActiveGroup
              isFindUserShow={isFindUserShow}
              setIsFindUserShow={setIsFindUserShow}
            />
          </div>
        )}
      </div>
      {isCreateGroupShown && (
        <CreatGroup currentUser={currentUser} setIsCreateGroupShown={setIsCreateGroupShown} />
      )}
      {isFindUserShow && (
        <FindUser isFindUserShow={isFindUserShow} setIsFindUserShow={setIsFindUserShow} />
      )}
    </div>
  )
}

export default GroupDashboard
