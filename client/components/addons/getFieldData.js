/* eslint-disable no-console */
import ui from '../UI/config.ui'

export default function getFieldData(status, field, firstInnerProp, secondInnerProp) {
  if (typeof firstInnerProp !== 'undefined' && typeof secondInnerProp !== 'undefined') {
    return ui.task[status][field][firstInnerProp][secondInnerProp]
  }
  if (typeof firstInnerProp !== 'undefined' && typeof secondInnerProp === 'undefined') {
    return ui.task[status][field][firstInnerProp]
  }
  return ui.task[status][field]
}
