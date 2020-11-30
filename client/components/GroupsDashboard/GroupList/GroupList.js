/* eslint-disable no-console */
import React, { useState } from 'react'
import GroupListTitle from './GroupListTitle'
import SelectGroupButton from './SelectGroupButton'
import RemoveGroupButton from './RemoveGroupButton'
import CreateGroupButton from './CreateGroupButton'
import ui from '../../UI/config.ui'

const GroupList = (props) => {
  const [selectedGroupID, setSelectedGroupID] = useState(props.activeGroupID)

  return (
    <div
      className={`w-full  border rounded
        ${ui.groups.bgColor}
        ${ui.groups.bgOpacity}
        ${ui.groups.fontColor}`}
    >
      <GroupListTitle />
      <div className="mx-2 flex flex-col h-custom-20vh border rounded overflow-y-scroll">
        {props.groupList
          .filter((group) => group.creatorID === props.currentUser._id)
          .map((group) => (
            <div key={group._id} className="mx-1 mt-1 flex space-x-0">
              <SelectGroupButton
                group={group}
                activeGroupID={props.activeGroupID}
                setSelectedGroupID={setSelectedGroupID}
              />
              {group._id === selectedGroupID && (
                <div className="w-2/6 flex justify-items-center">
                  <RemoveGroupButton />
                </div>
              )}
            </div>
          ))}
      </div>
      <CreateGroupButton
        isCreateGroupShown={props.isCreateGroupShown}
        setIsCreateGroupShown={props.setIsCreateGroupShown}
      />
    </div>
  )
}

export default GroupList
