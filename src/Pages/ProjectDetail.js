import React, { useEffect, useState } from 'react';
import Navbar from '../Components/User/Navbar';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHashtag } from "react-icons/fa6";
import { LuCircleDotDashed } from "react-icons/lu";
import { MdPlayArrow } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import TodoList from './TodoList';
import Dropdown from './Dropdown';
import './style.css'
import { FaPlus } from "react-icons/fa";


const ProjectDialog = ({ isOpen, onClose, newProjectTitle, setNewProjectTitle, handleSaveNewProject }) => {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-[999] grid w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-[36rem] rounded-lg bg-white font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased shadow-2xl px-12 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 text-2xl font-semibold text-blue-gray-900">
          <span>Add New Project</span>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSaveNewProject}>
          <div className="flex flex-col mb-6">
            <label className="mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title here"
              name="title"
              className="p-3 border-2 focus:border-gray-400 border-gray-200 rounded-lg"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="mr-2 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30"
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85]"
              type="submit"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function ProjectDetails() {
  const baseURL = 'https://hatio.toeman.online';
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const[title,setTitle]= useState('')
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(baseURL + '/projects/', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setItems(response.data);
      } else {
        console.log('Error fetching projects');
      }
    } catch (error) {
      console.error('There was an error fetching the projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddNew = () => {
    setIsDialogOpen(true);
  };

  const handleSaveNewProject = async (e) => {
    e.preventDefault();
    if (newProjectTitle.trim()) {
      try {
        const response = await axios.post(baseURL + '/addproject/', { title: newProjectTitle }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 201) {
          setItems([...items, response.data]);
          setNewProjectTitle('');
          setIsDialogOpen(false);
          navigate(`/project/${response.data.id}`);
        } else {
          console.log('Error saving project');
        }
      } catch (error) {
        console.error('There was an error saving the project:', error);
      }
    }
  };

  const handleDeleteProject = async (itemId) => {
    try { 
      const response = await axios.delete(`${baseURL}/delete-project/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 204) {
        setItems(items.filter(item => item.id !== itemId));
        console.log('Project deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='flex flex-col bg-gray-200'>
      <div className="flex flex-row w-screen">
        <aside className="flex w-80 flex-col  bg-gray-200 mt-2" >
          <div className='ml-2 mt- mr-3 bg-projectlist rounded-2xl' style={{ height: '98vh' }}>
            <div className=" flex w-80 pt-5 items-center justify-center border-r-2 border-gray-200  mb-2">
              <span className="mx-4 -ml-2 w-60 my-2 bg-blue-600 hover:bg-blue-700  text-white py-2 flex items-end justify-center cursor-pointer rounded-lg font-bold" onClick={handleAddNew} >
                <span className='text-md'>New Project</span>
                <span className='ml-2 mb-1 text-sm'><FaPlus /></span>
              </span>
            </div>

            <div className="mx-2 mt-4 flex-1 overflow-auto rounded-lg custom-scrollbar" style={{ height: 'calc(100vh - 8rem)' }}>
              <div >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-row items-center justify-between hover:bg-gray-500
                      ${item.id == id ? 'bg-gray-600' : ''} border-b-2 border-gray-700`}
                  >
                    <Link to={`/project/${item.id}`} className='w-52'>
                      <div className='px-2 flex flex-row items-center'>
                        {item.id === id ? (
                          <span className='text-md mt-1 text-white'>
                            <FaRegDotCircle />
                          </span>
                        ) : (
                          <span className='text-xs text-white'>
                            <LuCircleDotDashed />
                          </span>
                        )}
                        <span className="flex items-center space-x-1 rounded-md px-2 py-2">
                          <span className='text-white text-md font-semibold'>{item.title}</span>
                        </span>
                      </div>
                    </Link>
                    <div className='text-xl mr-1 flex flex-row items-center justify-between'>
                      <Dropdown
                        handleDeleteProject={handleDeleteProject}
                        id={item.id}
                        fetchProjects={fetchProjects}
                        name={item.title}
                        setTitle={setTitle}
                      />
                    </div>
                  </div>
                ))}

                <ProjectDialog
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  newProjectTitle={newProjectTitle}
                  setNewProjectTitle={setNewProjectTitle}
                  handleSaveNewProject={handleSaveNewProject}
                />
              </div>
            </div>

          </div>
        </aside>
        <TodoList id={id} setTitle={setTitle} title={title}/>
      </div>
    </div>
  );
}

export default ProjectDetails;
