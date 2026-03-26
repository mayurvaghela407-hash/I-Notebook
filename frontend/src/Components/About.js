import React from 'react'

const About = () => {
  return (
    <div className="container mt-2">
      <h2>About I-Notebook</h2>
      <p>I-Notebook is a full-stack MERN application that allows users to securely manage their personal notes.</p>
      <p>This application provides user authentication using JWT, ensuring that all notes are private and accessible only to the logged-in user.</p>

      <h4>Key Features:</h4>
      <ul>
        <li>User Signup & Login Authentication</li>
        <li>Add, Edit, and Delete Notes</li>
        <li>Secure data storage using MongoDB</li>
        <li>Responsive and user-friendly interface</li>
      </ul>

      <h4>Tech Stack Used:</h4>
      <ul>
        <li><strong>Frontend:</strong> React.js</li>
        <li><strong>Backend:</strong> Node.js, Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
      </ul>

      <p>This project demonstrates CRUD operations, REST API integration, and authentication in a real-world application.</p>
    </div>
  )
}

export default About;
