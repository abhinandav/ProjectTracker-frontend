import axios from 'axios';
import React, { useState } from 'react';
import { CiMenuKebab } from 'react-icons/ci';


const RenameModal = ({ isOpen, onClose, newProjectTitle, setNewProjectTitle, handleSaveNewProject }) => {
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
            <span>Edit Project</span>
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





const Dropdown = ({ handleDeleteProject, id,fetchProjects,name ,setTitle}) => {
  const baseURL = 'https://hatio.toeman.online';
  const [newProjectTitle, setNewProjectTitle] = useState(name);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddNew = () => {
    setIsDialogOpen(true);
  };

  const handleEditProject = async (e) => {
    e.preventDefault();
    if (newProjectTitle.trim()) {
      try {
        const response = await axios.put(baseURL + '/edit-project/', 
            { id: id, title: newProjectTitle }, 
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status === 200) { 
            setTitle(newProjectTitle)
          setNewProjectTitle('');
          setIsDialogOpen(false);
          fetchProjects();
        } else {
          console.error('Error saving project: Unexpected response status', response.status);
        }
      } catch (error) {
        console.error('There was an error saving the project:', error.response ? error.response.data : error.message);
      }
    }
};


  return (<>
    <div className="relative inline-block text-left ">
      <button 
        onClick={() => setOpen(!open)} 
        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white"
      >
        <CiMenuKebab />
      </button>
      {open && (
        <div 
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 px-2 py-2 z-50"
          onClick={() => setOpen(false)}
        >
          <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md" onClick={handleAddNew}>
            Rename
          </span>
          <span 
            className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-md" 
            onClick={() => { handleDeleteProject(id); setOpen(false); }}
          >
            Delete
          </span>
        </div>
      )}
    </div>
        <RenameModal
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            newProjectTitle={newProjectTitle}
            setNewProjectTitle={setNewProjectTitle}
            handleSaveNewProject={handleEditProject} 
        />

  </>
  );
};

export default Dropdown;
