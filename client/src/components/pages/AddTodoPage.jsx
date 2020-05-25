import React from 'react'
import M from 'materialize-css'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addTodoThunk } from '../../redux/todo-reducer';
import idea from '../../image/idea.jpg'
import project from '../../image/project.jpg'
import task from '../../image/training.jpg'

const AddTodoPage = ({ userId, addTodoThunk}) => {

  useEffect(() => {
    M.AutoInit();
  })
 
 const [form, setForm] = useState({todo: '', comment: '', typeTodo: '', priority: ''})
 const [disabled, setDisabled] = useState(false)

 const changeHandler = event => {
  setForm({...form, [event.target.name]: event.target.value })
} 

  const handleSubmit = async (e) => {
      e.preventDefault()
      setDisabled(true) 
      const response  = await addTodoThunk(userId, form)
      setForm({form, todo: '', comment: '', typeTodo: '', priority: '' })
      window.M.toast({html: response.message})
      setDisabled(false) 
}


  return(
    <div className = "addTodo">
    <h1>Add todo</h1> 
     <form onSubmit = {handleSubmit}>
       <div className="row">
        <form className="col s12 heightTodoForm">
          <div className="row">
            <div className="input-field col s10 offset-s1">
              <textarea id="textarea1" 
              name = "todo" 
              value = {form.todo}
              className="materialize-textarea"
               onChange={changeHandler}></textarea>
              <label forhtml="textarea1">Назва</label>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <form className="col s12 heightTodoForm">
          <div className="row">
            <div className="input-field col s10 offset-s1">
              <textarea id="textarea1" 
              name = "comment" 
              value = {form.comment}
              className="materialize-textarea"
               onChange={changeHandler}></textarea>
              <label forhtml="textarea1">Коментар</label>
            </div>
          </div>
        </form>
      </div>
       <div className="row">
        <div className="input-field col s10 offset-s1">
          <select className="icons" name="typeTodo" value = {form.typeTodo} onChange={changeHandler} >
            <option value="" disabled selected>Виберіть тип завдання</option>
            <option value="task" name = "typeTodo" data-icon= {task} className="left">Завдання</option>
            <option value="project" name = "typeTodo" data-icon={project} className="left">Проекти</option>
            <option value="idea"  name = "typeTodo" data-icon={idea} className="left">Ідеї</option>
          </select>
          <label>Тип завдання</label>
        </div>
        </div>  
        <div className="radioBtn-section row"> 
        <div>
          <label className = 'col s2 offset-s1'>Пріоритет</label>
        </div>
        <form action="#" className = "col s10 offset-s1">
            <p>
              <label>
                <input  value = "1" name="priority" type="radio" onChange = {changeHandler} />
                <span>Високий</span>
              </label>
            </p>
            <p>
              <label>
                <input value = "2"  name="priority" type="radio" onChange = {changeHandler}/>
                <span>Середній</span>
              </label>
            </p>
            <p>
              <label>
                <input  value = "3"  name="priority" type="radio" onChange = {changeHandler} />
                <span>Низький</span>
              </label>
            </p>
          </form>
        </div>
        <div className = 'addTodoBtn'>
          {!disabled
              ? <button type='submit'  className='btn'>Додати</button>
              : <button type='submit' disabled className='btn'>Додати</button>
           }
        </div>   
       </form> 
    </div>
  )
}
const mapStateToProps = state => {
  return{
    userId: state.authPage.userId
  }
}

export default connect(mapStateToProps, { addTodoThunk })(AddTodoPage)