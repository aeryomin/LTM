/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../../components/Header/Header'
import Footer from '../../components/MainPage/Footer/Footer'
import TaskList from '../../components/MainPage/TaskList/TaskList'
import FormNewTask from '../../components/FormNewTask/FormNewTask'

const MainPage = () => {
  const { isFormShown } = useSelector((s) => s.form)

  return (
    <div className="relative w-screen h-screen bg-custom-main-page-4 bg-cover flex flex-col divide-y md:max-w-screen-md md:mx-auto">
      <Header />
      <TaskList />
      <Footer />
      {isFormShown && <FormNewTask />}
    </div>
  )
}

MainPage.propTypes = {}

export default MainPage
