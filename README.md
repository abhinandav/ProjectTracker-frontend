# Task Flow

Task Flow is a modern project tracker designed to help you manage tasks, track progress, and stay organized. Built using React and Redux, this application provides an intuitive user interface and robust functionality for tracking project workflows.

## Features

- **Task Management:** Create, edit, and delete tasks.
- **Project Tracking:** Organize tasks by projects and track their progress.
- **User Authentication:** Secure login and registration.

## Tech Stack

- **Frontend:**
  - React (18.3.1)
  - React DOM (18.3.1)
  - React Redux (9.1.2)
  - React Router DOM (6.26.0)
  - Axios (1.7.3)
  - Boxicons (2.1.4)
  - JWT Decode (4.0.0)
  - React Icons (5.2.1)

**Backend:**
  - Django
  - Corsheaders
  - Rest_framework_simplejwt
  - Rest_framework

## Setup

### Prerequisites

- Node.js (>=14.x)
- Python  (>=10.x)
- npm (>=6.x) or yarn

### Installation

1. **Clone the repository:**

    ```bash
   https://github.com/abhinandav/ProjectTracker-frontend.git
   cd ProjectTracker-frontend
   https://github.com/abhinandav/ProjectTracker-backend.git
   cd ProjectTracker-backend
   python -m venv myenv
   myenv\Scripts\activate

    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root of the project and add the following variables:

    ```plaintext
    REACT_APP_GITHUB_TOKEN=your_github_token
    ```

    Make sure to replace `your_github_token` with your actual GitHub token.

4. **Run the application:**

    Using npm:

    ```bash
    npm start
    ```

    Or using yarn:

    ```bash
    yarn start
    ```

    This will start the development server and open the application in your default browser.

## Testing

### Running Tests

1. **Run the test suite:**

    Using npm:

    ```bash
    npm test
    ```

    Or using yarn:

    ```bash
    yarn test
    ```

    This will execute the test suite and display the results in the terminal.

## Deployment

For deploying your application, follow these steps:

1. **Build the application:**

    Using npm:

    ```bash
    npm run build
    ```

    Or using yarn:

    ```bash
    yarn build
    ```

    This will create a production-ready build in the `build` directory.

2. **Deploy the build:**

    You can deploy the build directory to any static file hosting service, such as Vercel or Netlify.


