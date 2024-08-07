import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { FaRegCircle,FaCheckCircle,FaRegEdit } from "react-icons/fa";
import { IoIosArrowDown ,IoIosArrowUp} from "react-icons/io";
import './style.css'
import bgimage from '../images/bg.jpg'
import ProjectNavbar from './ProjectNavBar';


function TodoList({id,setTitle,title}) {
    const baseURL = 'https://hatio.toeman.online';
    const [pendingTodos, setPendingTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [completedOpen, setCompletedOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const[isEditing,setIsEditing]= useState(false)
    const [editTodoId, setEditTodoId] = useState(null);
    const[editTodo,setEditTodo]=useState('')
    const inputRef = useRef(null);


    useEffect(() => {
      const getTitle = () => {
        axios.get(`${baseURL}/project-detail/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json'
          }
        })
        .then((res) => setTitle(res.data.title)) 
        .catch((error) => console.error('Error fetching title:', error));
      };
  
      if (id) {
        getTitle();
      }
    }, [id]);

    

    const handleAddTodo = async (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
          try {
            const response = await axios.post(
              `${baseURL}/project/${id}/todos/add/`,
              { project: id, description: newTodo },
              {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access')}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            if (response.status === 201) {
              setPendingTodos([...pendingTodos, response.data]);
              setNewTodo('');
            }
          } catch (error) {
            console.error('There was an error saving the todo:', error);
          }
        }
      };

      const fetchPendingTodos = async () => {
        try {
          const response = await axios.get(`${baseURL}/project/${id}/todos/pending/`);
          setPendingTodos(response.data);
        } catch (error) {
          console.error("Error fetching pending todos:", error);
        }
      };
  
      const fetchCompletedTodos = async () => {
        try {
          const response = await axios.get(`${baseURL}/project/${id}/todos/completed/`);
          setCompletedTodos(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.error("Error fetching completed todos:", error);
        }
      };

    useEffect(() => {
      fetchPendingTodos();
      fetchCompletedTodos();
    }, [id]);
    

    const handleStatusChange = async (todoId) => {
      try {
        const response = await axios.post(`${baseURL}/todo-status/${todoId}/`);
        const updatedTodo = response.data;
  
        if (updatedTodo.status === 'Completed') {
          setPendingTodos(pendingTodos.filter(todo => todo.id !== todoId));
          setCompletedTodos([...completedTodos, updatedTodo]);
        } else {
          setCompletedTodos(completedTodos.filter(todo => todo.id !== todoId));
          setPendingTodos([...pendingTodos, updatedTodo]);            
        }
      } catch (error) {
        console.error("Error updating todo status:", error);
      }
    };

    const handleCompleteBox=()=>{
      setCompletedOpen(prevState => !prevState);
    }

    const handleDelete = async (todoId,type) => {
      try { 
        const response = await axios.delete(`${baseURL}/delete-todo/${todoId}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type':'application/json'
            
          }
        });
    
        if (response.status === 204) {
          if(type=='pending'){
            setPendingTodos(pendingTodos.filter(todo=>todo.id!==todoId))
          }
          else if(type=='completed'){
            setCompletedTodos(completedTodos.filter(todo=>todo.id!==todoId))
          }
          console.log('Todo deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };

    const handleEdit = (id, description) => {
      setEditTodoId(id);
      setEditTodo(description);
      setIsEditing(true); 
    };
    

    useEffect(() => {
      if (editTodoId !== null && inputRef.current) {
          inputRef.current.focus(); 
      }
  }, [editTodoId]);

  const handleEditSubmit=async(e,todoId)=>{
    e.preventDefault();
    if (editTodo.trim()) {
      try {
        const response = await axios.put(baseURL + '/edit-todo/', 
            { id: todoId, text: editTodo }, 
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 200) {
          setEditTodoId(null); 
          setEditTodo('');
          setIsEditing(false); 
          fetchPendingTodos();
          fetchCompletedTodos();
        } else {
          console.error('Error saving todo: Unexpected response status', response.status);
        }
      } catch (error) {
        console.error('There was an error saving the todo:', error.response ? error.response.data : error.message);
      }
    }
    }

    useEffect(() => {
      if (isEditing && inputRef.current) {
          inputRef.current.focus(); 
      }
  }, [isEditing]);


      
  return (
    <div className="w-full flex flex-col mr-1">
      <div className='mt-2'>
        <ProjectNavbar title={title} pendingTodos={pendingTodos} completedTodos={completedTodos}/>
      </div>

      <div>
      <div
        className="relative pt-20 bg-color"
        style={{
          height: 'calc(100vh - 5.6rem)',
          backgroundImage: `url(${bgimage})`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <style>
          {`
          .pt-20::-webkit-scrollbar {
              display: none;
          }
          `}
        </style>

        <div className="fixed  -mt-20 z-10 w-full ">
          <form onSubmit={handleAddTodo} className="mt-3 ml-10">
            <div className="flex flex-row items-center justify-between mx-10 max-w-[1000px] ">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 mb-1 -mr-2 z-10">
                  <span className="text-3xl text-white">+</span>
                </div>
                <input
                  type="text"
                  placeholder="Add new todo here"
                  name="todo"
                  className="pl-12 pr-5 py-3 my-2 w-full  rounded-3xl shadow-sm backdrop-blur-lg bg-transparent text-white border-2 border-white placeholder-white"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>

        <div
          className="overflow-auto pt-10"
          style={{
            paddingTop: '2rem',
            height: 'calc(100vh - 12rem)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <ul>
            {pendingTodos
            .map((todo, index) => (
              <li key={todo.id}>
                <div className="flex ml-20 flex-row items-center justify-between max-w-[1000px] bg-gray-100 shadow-sm rounded px-4 py-3 my-2">
                  <div className="flex items-center justify-center max-w-[300px]">
                    <p className="mr-3">{index + 1}</p>
                    {editTodoId === todo.id ? (
                      <form onSubmit={(e) => handleEditSubmit(e, todo.id)}>
                        <input
                          ref={inputRef}
                          className="ml-3 bg-blue-200 p-2 focus:outline-none"
                          value={editTodo}
                          onChange={(e) => setEditTodo(e.target.value)}
                        />
                      </form>
                    ) : (
                    <div className='flex flex-col'>
                      <p className="ml-3 max-w-[200px]">{todo.description}</p>
                      
                      </div> )}
                  </div>
                  <div className="flex items-center justify-end w-64 cursor-pointer">
                  <span className='text-xs text-gray-500'>{todo.created_date} </span>
                    <span
                      className="text-xl text-teal-500 hover:text-teal-600 mx-3 cursor-pointer"
                      onClick={() => handleEdit(todo.id, todo.description)}
                    >
                      <FaRegEdit />
                    </span>
                    <span
                      className="text-2xl text-red-500 hover:text-red-600 mr-3 cursor-pointer"
                      onClick={() => handleDelete(todo.id, 'pending')}
                    >
                      <MdDelete />
                    </span>
                    <span
                      className="text-2xl mx-3"
                      onClick={() => handleStatusChange(todo.id)}
                    >
                      {todo.status === 'Completed' ? (
                        <FaCheckCircle />
                      ) : (
                        <FaRegCircle />
                      )}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {completedTodos.length > 0 && (
            <div
              onClick={handleCompleteBox}
              className="cursor-pointer bg-gray-200 w-32 left-3 p-2 m-5 rounded-xl flex flex-row items-center justify-between"
            >
              <span>Completed</span>
              <span className="mx-2">
                {completedOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          )}

          {completedTodos.length > 0 && !completedOpen && (
            <ul>
              {completedTodos.map((todo, index) => (
                <li key={todo.id}>
                  <div className="flex ml-20 flex-row items-center justify-between max-w-[1000px] bg-gray-100 shadow-sm rounded px-4 py-3 my-2">
                    <div className="flex items-center justify-center max-w-[700px]">
                      <p className="mr-3">{index + 1}</p>
                      <p className="ml-3">{todo.description}</p>
                    </div>
                    <div className="flex items-center justify-end w-64 cursor-pointer">
                    <span className='text-xs text-gray-500'>{todo.created_date} </span>
                      <span
                        className="text-2xl text-red-500 hover:text-red-600 mr-3 cursor-pointer"
                        onClick={() => handleDelete(todo.id, 'completed')}
                      >
                        <MdDelete />
                      </span>
                      <span
                        className="text-2xl mx-3"
                        onClick={() => handleStatusChange(todo.id)}
                      >
                        {todo.status === 'Completed' ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegCircle />
                        )}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default TodoList