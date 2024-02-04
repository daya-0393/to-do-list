'use client'

import TasksPage from './TasksPage/page';
import LoginPage from './login/page';
import { UserAuth } from './context/AuthContext';
import { TasksProvider } from './context/Tasks/TasksProvider';
import { Fragment, useEffect } from 'react';

export default function Home() {

  const $localStorage = globalThis.window?.localStorage;
  const userVerified = $localStorage.getItem('userId');
  const { user } = UserAuth();

  return (
    <Fragment>
      {!userVerified && !user 
      ? <LoginPage/>
      : <TasksProvider>
          <TasksPage/>
        </TasksProvider>     
      }
    </Fragment>
  )
}
