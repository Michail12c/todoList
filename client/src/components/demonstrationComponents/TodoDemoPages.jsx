import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { constructorContent, countDone } from '../../common/helper';
import { updateTodoAC, deleteTodoAC, cancelUpdateAC } from '../../redux/demo-reducer';


const TodoDemoPage = ({todo, updateTodoAC, deleteTodoAC, cancelUpdateAC}) => {
  
  let taskArr = [],
      projectArr = [],
      ideaArr = []; 
  let doneTask = 0, 
      doneProject = 0, 
      doneIdea = 0;      
  let contentTask = 'Завдань поки що немає'; 
  let contentProject = 'Проектів поки що немає';
  let contentIdea = 'Ідей поки що немає'; 

  const [statusContent, setStatus] = useState(0)

  const deleteTodo = (todoCard) => {
    deleteTodoAC(todoCard)
  }

  const updateTodo = async (newTodo) => {
    updateTodoAC(newTodo.todo)
  }

  const cancelUpdate = (todo) => {
   cancelUpdateAC(todo)
  }

  if(todo.length !== 0){
     todo.map(elem => constructorContent(elem, taskArr, projectArr, ideaArr))
     if(taskArr.length !== 0){
       doneTask = countDone(taskArr)
       contentTask = taskArr.map((elem, index) => <Cards roleCard = {'task'}  cancelUpdate={cancelUpdate} date={elem.date} deleteTodo = {deleteTodo} changeDate={elem.changeDate} todo = {elem.todo} comment = {elem.comment} updateTodo = {updateTodo} priority = {elem.priority}/>) 
     }
     if(projectArr.length !== 0){
      doneProject = countDone(projectArr)
      contentProject = projectArr.map((elem, index) => <Cards roleCard = {'project'}  cancelUpdate={cancelUpdate} date={elem.date}  deleteTodo = {deleteTodo} changeDate={elem.changeDate}  todo = {elem.todo} comment = {elem.comment} updateTodo = {updateTodo} priority = {elem.priority}/>) 
     }
     if(ideaArr.length !== 0){
       doneIdea = countDone(ideaArr)
       contentIdea = ideaArr.map((elem, index) => <Cards roleCard = {'idea'} cancelUpdate={cancelUpdate} date={elem.date}  deleteTodo = {deleteTodo} changeDate={elem.changeDate}  todo = {elem.todo} comment = {elem.comment} updateTodo = {updateTodo} priority = {elem.priority}/>) 
     }
  }

   return (
     <div className = 'section-todoPage'>
        <div className="statistic">
             {statusContent == 0 && `Всього завдань ${taskArr.length}.` + ` Виконано ${doneTask}.`}
             {statusContent == 1 && `Всього проектів ${projectArr.length}.` + ` Виконано ${doneProject}.` }
             {statusContent == 2 && `Всього ідей ${ideaArr.length}.` + ` Виконано ${doneIdea}.` }
        </div>
        <h3>Ваші задачі</h3> 
      
        <div className = 'todoPage row'>
           <div className = 'menuTodo col s4 m2'>
             <div onClick = {() => setStatus(0)} className = {statusContent == 0 ? 'menuListActive' : 'menuList'}>
                Завдання
             </div>
              <div onClick = {() => setStatus(1)} className = {statusContent == 1 ? 'menuListActive' : 'menuList'}>
                Проекти
              </div>
              <div onClick = {() => setStatus(2)} className = {statusContent == 2 ? 'menuListActive' : 'menuList'}>
                Ідеї
              </div>
           </div>
           <div className = 'contentTodo col s8'>
             {statusContent == 0 ? contentTask : ''}
             {statusContent == 1 ? contentProject : '' }
             {statusContent == 2 ? contentIdea : '' }
           </div>
        </div>

        <div className="mobile-todo row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3"><a className="activeAuth active" href="#test1">Завдання</a></li>
              <li className="tab col s3"><a className="activeAuth"   href="#test2">Проекти</a></li>
              <li className="tab col s3"><a className="activeAuth"  href="#test3">Ідеї</a></li>
            </ul>
            </div>
            <div id="test1" className="col s12 contentTodo">
              {contentTask}
            </div>
            <div id="test2" className="col s12 contentTodo">
              {contentProject}
            </div>
            <div id="test3" className="col s12 contentTodo">
              {contentIdea}
            </div>
         </div>
     </div>
   )
}

const Cards = ({todo, comment, priority, deleteTodo, updateTodo, date, changeDate, cancelUpdate, roleCard}) => {
  
  let formatDate; 

  const [statusDelete, setDelete] = useState(false)
  const [colorCard, setColorCard] = useState(false)

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  }
   if(changeDate){
     formatDate = new Intl.DateTimeFormat('ua', options).format(changeDate)
   }

  let dateTodo = new Intl.DateTimeFormat('ua', options).format(date)
  let styleCard; 
  
  switch(priority){
    case '1':
      styleCard = "card #0d47a1 blue darken-4"
      break
    case '2':
      styleCard = "card #1e88e5 blue darken-1" 
      break
    case '3':
       styleCard = "card #90a4ae #42a5f5 blue lighten-1"
     break 
    case '4': 
      styleCard = "card #4caf50 green"
    break
  }
 const changeColor = (e) => {
   e.preventDefault()
   priority !== '4' ? updateTodo({todo, priority}) : cancelUpdate(todo)
   setColorCard(!colorCard)
 }

 const answerDelete = (e) => {
   e.preventDefault()
   setDelete(!statusDelete)
 }

  const deleteCard = (e) => {
    e.preventDefault()
    deleteTodo(todo)
    setDelete(false) 
  }



   return(
     <div className = 'cards'>
        <div className="row">
          <div className="col s12">
            <div className= {styleCard}>
              <div className="card-content white-text">
                <span className="card-title">{todo}</span>
                <p>{comment}</p>
                 <p>Додано: <span>{ dateTodo}</span></p> 
                 {formatDate  && <p>Зробленно: <span>{ formatDate }</span></p>} 
              </div>
              <div className="card-action">
                <a href="#" onClick = {changeColor}>
                   {priority !== '4' ? 'Зроблено' : 'Відмінити'}
                </a>
                {!statusDelete 
                      ? <a href="#" onClick = {answerDelete}>Видалити</a> 
                      : <span>Ви впевненні, що хочете видалити картку?
                            <a href="#" onClick = {(e) => deleteCard(e)}><span className = "deleteYes">так</span></a> 
                            <a href="#" onClick = {answerDelete}>ні</a>
                        </span> 
                 }
              </div>
            </div>
          </div>
        </div>
     </div>
   )
}


const mapStateToProps = state => {
  return {
    todo: state.demoPage.todo
  }
}

export default connect(mapStateToProps, {updateTodoAC, deleteTodoAC, cancelUpdateAC})(TodoDemoPage)