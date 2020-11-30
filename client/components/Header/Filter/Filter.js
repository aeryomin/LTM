/* eslint-disable no-console */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import FilterIcon from './FilterIcon'
import { setFilterOption, setTasklistToRender } from '../../../redux/reducers/tasks'
import useOutsideAlerter from '../../addons/hooks'

const Filter = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { filterOption, sortOption } = useSelector((s) => s.tasks)
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const wrapperRef = useRef(null)
  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsDropdownShown(false)
    }
  }, [])
  const onClick = () => {
    setIsDropdownShown(!isDropdownShown)
  }
  const taskStatuses = [
    {
      id: 1,
      option: 'all',
      name: t('header.Filter.name.all'),
      altName: t('header.Filter.altName.all')
    },
    {
      id: 2,
      option: 'new',
      name: t('header.Filter.name.new'),
      altName: t('header.Filter.altName.new')
    },
    {
      id: 3,
      option: 'active',
      name: t('header.Filter.name.active'),
      altName: t('header.Filter.altName.active')
    },
    {
      id: 4,
      option: 'hold',
      name: t('header.Filter.name.hold'),
      altName: t('header.Filter.altName.hold')
    },
    {
      id: 5,
      option: 'done',
      name: t('header.Filter.name.done'),
      altName: t('header.Filter.altName.done')
    }
  ]

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useOutsideAlerter(wrapperRef, setIsDropdownShown)

  return (
    <div className="relative w-auto mx-auto my-auto text-white text-sm">
      <button className="flex items-center" type="button" onClick={onClick}>
        <FilterIcon />
        <div className="pt-1 text-xs whitespace-nowrap">
          {taskStatuses.find((status) => status.option === filterOption).altName}
        </div>
      </button>

      {isDropdownShown && (
        <div
          ref={wrapperRef}
          className="absolute -left-16 w-40 flex flex-col space-y-1 bg-gray-600 bg-opacity-75 border border-gray-400 rounded-sm p-1"
        >
          {taskStatuses.map((status) => {
            return (
              <div className="flex flex-col" key={status.id}>
                <button
                  className=" text-lg border rounded-sm bg-gray-600 text-gray-200 hover:bg-gray-400"
                  type="button"
                  onClick={() => {
                    dispatch(setFilterOption(status.option))
                    dispatch(setTasklistToRender(status.option, sortOption))
                    setIsDropdownShown(!isDropdownShown)
                  }}
                >
                  {status.name}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Filter
