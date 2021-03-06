/* eslint-disable no-console */
import React, { useState, useRef } from 'react'
// import React, { useState, useRef, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import Calendar from 'react-calendar'
import { useTranslation } from 'react-i18next'
import { setExpirationDate } from '../../redux/reducers/form'
import useOutsideAlerter from '../addons/hooks'
import 'react-calendar/dist/Calendar.css'

const InputExpirationData = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const [isCalendarShown, setIsCalendarShown] = useState(false)
  const wrapperRef = useRef(null)

  // const Calendar = React.lazy(() => import('react-calendar'))
  // const CalendarSuspended = (props) => (
  //   <Suspense fallback="Loading...">
  //     <Calendar onChange={props.onChange} value={props.date} />
  //   </Suspense>
  // )

  const onClick = () => {
    setIsCalendarShown(!isCalendarShown)
  }

  const onChange = (nextValue) => {
    setDate(nextValue)
  }

  useOutsideAlerter(wrapperRef, setIsCalendarShown)

  return (
    <div className="flex flex-col justify-center text-white">
      <button
        type="button"
        onClick={onClick}
        className="mx-auto border border-white rounded hover:bg-gray-700 px-4 py-2 mb-2 text-sm"
      >
        {t('formNewTask.InputExpirationData.openCalendarButton.content')}
      </button>
      {isCalendarShown && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 z-30">
          <div
            ref={wrapperRef}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto p-2 text-gray-600 border border-gray-600 rounded bg-gray-900 bg-opacity-75"
          >
            <Calendar onChange={onChange} value={date} className="" />
            {/* <CalendarSuspended onChange={onChange} value={date} className="" /> */}
            <div className="flex justify-around mt-2">
              <button
                type="button"
                onClick={() => {
                  dispatch(setExpirationDate(date))
                  setIsCalendarShown(!isCalendarShown)
                }}
                className="text-gray-200 px-4 py-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                {t('formNewTask.InputExpirationData.setDateButton.content')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setDate(new Date())
                  setIsCalendarShown(!isCalendarShown)
                }}
                className="text-gray-200 px-4 py-2 border border-gray-200 rounded hover:bg-gray-700"
              >
                {t('formNewTask.InputExpirationData.cancelButton.content')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InputExpirationData
