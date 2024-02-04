const getTasks = async () => {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_DB_DOMAIN}/${userId}.json`);
    const data = await response.json();
    const tasksArray = [];
    for(let t in data.completed){
      tasksArray.push({
        id: t,
        content: data.completed[t].content
      });
    }
    setTasks(tasksArray);
  }catch(error){
    console.log(error);
  }
} 
