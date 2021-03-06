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
      <div className="mx-2 flex flex-col space-y-1 py-1 h-custom-20vh border rounded overflow-y-scroll">
        {props.groupList
          .filter((group) => group.creatorID === props.currentUser._id)
          .map((group) => (
            <div key={group._id} className="flex-shrink-0 mx-1 flex">
              <SelectGroupButton
                group={group}
                activeGroupID={props.activeGroupID}
                setSelectedGroupID={setSelectedGroupID}
              />
              {group._id === selectedGroupID && (
                <div className="flex justify-items-center h-full ml-2 flex-grow w-full">
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
