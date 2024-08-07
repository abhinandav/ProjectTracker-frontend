import React, { useState } from 'react';
import { IoMdDownload } from "react-icons/io";
import AlertBox from './AlertBox'; 

const GistDownload = ({ projectTitle, pendingTodos, completedTodos }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gistCreated, setGistCreated] = useState(false);
  const [gitLink,setGitLink]=useState('')
  const [showAlert, setShowAlert] = useState(false); 

  const formatMarkdown = () => {
    const totalTodos = pendingTodos.length + completedTodos.length;
    const completedCount = completedTodos.length;

    const pendingTasks = pendingTodos.length > 0
      ? pendingTodos.map(todo => `- [ ] ${todo.description}`).join('\n')
      : 'No pending tasks';

    const completedTasks = completedTodos.length > 0
      ? completedTodos.map(todo => `- [x] ${todo.description}`).join('\n')
      : 'No completed tasks';

    return `
# ${projectTitle}

Summary: ${completedCount} / ${totalTodos} completed

## Section 1: Pending Todos
${pendingTasks}

## Section 2: Completed Todos
${completedTasks}
    `.trim();
  };

  const handleDownload = () => {
    setLoading(true);
    setError(null);

    try {
      const markdownContent = formatMarkdown();
      const blob = new Blob([markdownContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectTitle}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('Failed to create the file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleCreateGist = async () => {
    setLoading(true);
    setError(null);
    setGistCreated(false);
    console.log('GitHub Token:', process.env.REACT_APP_GITHUB_TOKEN);


    try {
      const markdownContent = formatMarkdown();
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      const response = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: projectTitle,
          public: true,
          files: {
            [`${projectTitle}.md`]: {
              content: markdownContent,
            },
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setGitLink(result.html_url)
        setGistCreated(true)
        setShowAlert(true); 

      } else {
        throw new Error(result.message || 'Failed to create gist');
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => setShowAlert(false);

  return (
    <div>
      <button
        onClick={handleCreateGist}
        className="text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? 'Generating File...' : (
          <div className='flex'>
            <span>Project Summary</span>
            <span className='text-lg ml-2 mt-1'><IoMdDownload /></span>
          </div>
        )}
      </button>

      <AlertBox
        isOpen={showAlert}
        setShowAlert={setShowAlert}
        onClose={handleCloseAlert}
        link={gitLink}
        handleDownload={handleDownload}
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default GistDownload;
