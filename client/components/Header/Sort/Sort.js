/* eslint-disable no-console */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setSortOption, setSortExchange, setTasklistToRender } from '../../../redux/reducers/tasks'
import SortIcon from './SortIcon'
import SortExchangeIcon from './SortExchangeIcon'
import useOutsideAlerter from '../../addons/hooks'

const Sort = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { filterOption, sortOption, sortExchange } = useSelector((s) => s.tasks)
  const [isDropdownShown, setIsDropdownShown] = useState(false)
  const wrapperRef = useRef(null)
  const escFunction = useCallback((e) => {
    if (e.key === 'Escape') {
      setIsDropdownShown(false)
    }
  }, [])
  const sortOpt = [
    {
      id: 1,
      option: 'expDate',
      name: t('header.Sort.name.expDate'),
      altName: t('header.Sort.altName.expDate')
    },
    {
      id: 2,
      option: 'name',
      name: t('header.Sort.name.taskName'),
      altName: t('header.Sort.altName.taskName')
    },
    {
      id: 3,
      option: 'date',
      name: t('header.Sort.name.creactionDate'),
      altName: t('header.Sort.altName.creactionDate')
    }
  ]
  const handleIsDropdownShown = () => {
    setIsDropdownShown(!isDropdownShown)
  }

  const handleExchangeSort = () => {
    dispatch(setSortExchange(sortExchange === 'up' ? 'down' : 'up'))
    dispatch(setSortOption(sortOption))
    dispatch(setTasklistToRender(filterOption, sortOption))
  }

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [])

  useOutsideAlerter(wrapperRef, setIsDropdownShown)

  return (
    <div className="relative mx-auto my-auto text-white text-sm">
      <div className="flex items-center space-x-2">
        <button className="flex items-center" type="button" onClick={handleIsDropdownShown}>
          <SortIcon />
          <div className="pt-1 text-xs">
            {sortOpt.find((item) => item.option === sortOption).altName}
          </div>
        </button>
        <button type="button" onClick={handleExchangeSort} aria-label="Sort exchange icon">
          <SortExchangeIcon />
        </button>
      </div>

      {isDropdownShown && (
        <div
          ref={wrapperRef}
          className="absolute -left-24 w-52 flex flex-col space-y-1 bg-gray-600 bg-opacity-75 border border-gray-400 rounded-sm p-1"
        >
          {sortOpt.map((item) => {
            return (
              <div className="flex flex-col" key={item.id}>
                <button
                  className=" text-lg border rounded-sm bg-gray-600 text-gray-200 hover:bg-gray-400"
                  type="button"
                  onClick={() => {
                    dispatch(setSortOption(item.option))
                    dispatch(setTasklistToRender(filterOption, item.option))
                    setIsDropdownShown(!isDropdownShown)
                  }}
                >
                  {item.name}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Sort
