import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isPinned: {
    type: Boolean,
    default:false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Todo', TodoSchema);