# 🚚 WareHouse Management System (MERN Stack)

🌐 **Live Demo**: [https://invent-x.vercel.app](https://invent-x.vercel.app)

A full-stack warehouse management system built using the **MERN stack** (MongoDB, Express, React, Node.js). This app allows you to manage inventory, track stock, and perform warehouse operations with a user-friendly interface.

---

## 📦 Features

- Add, update, and delete inventory items
- Track stock quantities in real time
- JWT-based secure authentication
- MongoDB cloud database integration
- Responsive frontend built with React

---
## Installation

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd <project_directory>
    ```

3. **Install Node.js dependencies:**

    ```bash
    # Install server dependencies
    npm install
    
    # Navigate to the client directory
    cd client
    
    # Install client dependencies
    npm install
    ```

## Configuration

1. **Environment Variables:**

    Create a `.env` file in the root directory with the following variables:

    ```plaintext
    PORT=5000 # Or any desired port number
    MONGODB_URI=<Your_MongoDB_Connection_String>
    ```

    Replace `<Your_MongoDB_Connection_String>` with your actual MongoDB connection string.

## Running the Application

1. **Start the server:**

    ```bash
    npm start
    ```

    This will start the server.

2. **Start the client:**

    Open a new terminal window/tab, navigate to the client directory, and run:

    ```bash
    cd client
    npm start
    ```

    This will start the React development server.

3. **Access the application:**

    Once both the server and client are running, you can access the application by navigating to [http://localhost:3000](http://localhost:3000) in your web browser.

## Folder Structure

- `frontend/`: Contains the React.js frontend code.
- `backend/`: Contains the Node.js/Express.js backend code.
- `README.md`: This file.
