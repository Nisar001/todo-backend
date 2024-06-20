# todo-backend
To-Do List Backend in NodeJS

## Features

- It have User registration and login
- authentication by JsonWebToken
- All CRUD operations for todos
- You can Pin/unpin todos
- Pagination for listing todos
- Search todos by title


## Installation of todo-backend

1. Clone the repository

   ```Terminal
   git clone https://github.com/Nisar001/todo-backend.git
   cd todo-backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   touch .env
   ```

4. Run the server
   ```bash
   nodemon start or npm start
   ```
   
## API'S :-

### Auth

- `POST /api/v1/auth/register` - Registration new User/Client
- `POST /api/v1/auth/login` - Login user/Client with credentials

### Todos

- All Routes are require for authentication first
- `POST /api/v1/todos` - Create a new todo 
- `GET /api/v1/todos` - Get all todos
- `GET /api/v1/todos/search` - Search todos by title
- `GET /api/v1/todos/:id` - Get a todo by ID 
- `PUT /api//v1todos/:id` - Update a todo by ID
- `DELETE /api/v1/todos/:id` - Delete a todo by ID
