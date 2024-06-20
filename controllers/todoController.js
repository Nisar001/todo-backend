import Todo from "../models/todoModel.js"

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = await Todo.create({
      user: req.user._id,
      title,
      description,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getTodos = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Todo.countDocuments({ user: req.user._id });

    const todos = await Todo.find({ user: req.user._id }).limit(pageSize).skip(pageSize * (page - 1));

    req.json({
      todos, page,
      pages: Math.ceil(count / pageSize)
    });

  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
}

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.user.toString() === req.user._id.toString()) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateTodo = async (req, res) => {
  const { title, description, isPinned } = req.body;
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.user.toString() === req.user._id.toString()) {
      todo.title = title || todo.title;
      todo.description = description || todo.description;
      todo.isPinned = isPinned !== undefined ? isPinned : todo.isPinned;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.user.toString() === req.user._id.toString()) {
      await todo.remove();
      res.json({ message: 'Todo removed' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



export const searchTodos = async (req, res) => {
  const searchString = req.query.q || '';
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Todo.countDocuments({
      user: req.user._id,
      title: { $regex: searchString, $options: 'i' },
    });
    const todos = await Todo.find({
      user: req.user._id,
      title: { $regex: searchString, $options: 'i' },
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ todos, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// export default {createTodo, getTodos, getTodoById, updateTodo, deleteTodo, searchTodos, }