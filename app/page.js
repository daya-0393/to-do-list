'use client'

import TasksPage from './TasksPage/page';
import LoginPage from './LoginPage/page';
import { UserAuth } from './context/AuthContext';

export default function Home() {

  const { user } = UserAuth();

  if(user){
    return <TasksPage/>
  }else{
    return <LoginPage/>
  }
}
