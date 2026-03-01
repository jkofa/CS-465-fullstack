# CS 465 – Full Stack Web Application Reflection

## Architecture

In this project, I developed a full stack web application using a Node.js and Express backend, a MongoDB database, and a JavaScript-based frontend including both traditional Express-rendered HTML and a single-page application (SPA).

The Express HTML approach renders pages server-side. Each request returns a full page reload. This is simple and effective for smaller applications but can feel slower because the browser reloads the entire page for every interaction.

In contrast, the single-page application (SPA) uses JavaScript to dynamically update content without refreshing the entire page. This creates a smoother and more responsive user experience. The SPA communicates with the backend using API calls and updates only the necessary components of the interface.

The backend used MongoDB (a NoSQL database) because it stores data in flexible JSON-like documents. This works well with JavaScript-based applications since the data structure aligns naturally with objects used in the frontend and backend. MongoDB also allows scalability and flexibility without requiring strict relational schemas.

---

## Functionality

JSON (JavaScript Object Notation) is a lightweight data format used for exchanging data between the frontend and backend. While JavaScript is a programming language, JSON is simply a structured data format. In this project, the backend returned JSON responses from API endpoints, and the frontend consumed that data to render content dynamically.

Throughout the development process, I refactored code to improve maintainability and efficiency. For example, I separated route logic from controller logic, organized API endpoints clearly, and reused UI components in the SPA. Refactoring reduced duplication and improved readability.

Reusable UI components provided several benefits:
- Improved consistency across the application  
- Easier maintenance and updates  
- Reduced repeated code  
- Faster development when adding new features  

---

## Testing

In a full stack application, API endpoints must be tested using different HTTP methods such as GET, POST, PUT, and DELETE. Each method serves a specific purpose in retrieving, creating, updating, or deleting data.

Testing becomes more complex when security layers are added. In this project, authentication was implemented for the admin login. This required validating tokens and restricting access to protected routes. Testing had to ensure that:
- Unauthorized users could not access admin endpoints  
- Valid credentials allowed access  
- Tokens were properly generated and verified  

Understanding endpoints means understanding how the frontend sends requests and how the backend processes them securely. Proper API testing ensures reliability and protects sensitive data.

---

## Reflection

This course strengthened my understanding of full stack development and how frontend, backend, and database layers work together. I gained hands-on experience building RESTful APIs, implementing authentication, working with MongoDB, and structuring scalable applications.

The skills I developed in this course include:
- Building secure login authentication systems  
- Designing REST APIs  
- Structuring backend architecture using Express  
- Working with MongoDB and NoSQL databases  
- Debugging full stack integration issues  

These skills make me more marketable because full stack development is highly valuable in modern software engineering roles. This course improved my ability to think system-wide rather than focusing on only one layer of an application.
