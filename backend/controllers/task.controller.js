//- Task list view
// - Add new task
// - Update task status
// - Delete task
const Task = require("../models/task");   
const User = require("../models/user");

exports.addNewTask = async(req, res) => {
    try{
        const {title, description} = req.body;
        if(!title){
            return res.status(400).json({message:"title are required"});
        }
        const task = await Task.create({title, description, userId: req.user.id});
        res.status(201).json({message:"Task created successfully", data: task});
    }catch(err){
        res.status(400).json({message:"something went wrong in addTask", error: err.message});
    }
}
/////////////
exports.getMyTasks = async(req, res) => {
    try{ 
        const userId = req.user.id;

          const page = parseInt(req.query.page) || 1; // الصفحة الحالية
          const limit = parseInt(req.query.limit) || 5; // عدد المهام في كل صفحة
          const offset = (page - 1) * limit;
           
        const {count, rows: tasks} = await Task.findAndCountAll({where:{userId}, limit, offset, order: [["created_at", "DESC"]] });
         const totalPages = Math.ceil(count / limit);
         
        res.status(200).json({message:"Tasks fetched successfully",page, totalPages,totalTasks: count, data: tasks});
    }catch(err){
        res.status(400).json({message:"something went wrong in getMyTasks", error: err.message});
    }
}
/////////////
exports.updateTaskStatus = async(req, res) => {
    try{
        const {status} = req.body;
        const task = await Task.findOne({where:{id: req.params.id, userId: req.user.id}});
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }
        task.status = status;
        await task.save();
        res.status(200).json({message:"Task updated successfully", data: task});
    }catch(err){
        res.status(400).json({message:"something went wrong in updateTask", error: err.message});
    }
};
//////////
exports.deleteTask = async(req,res)=>{
try{
    const task = await Task.findOne({where:{id: req.params.id, userId: req.user.id}});
    if(!task){
        return res.status(404).json({message:"Task not found"});
    }
    await task.destroy();
    res.status(200).json({message:"Task deleted successfully"});
}catch(err){
    res.status(400).json({message:"something went wrong in deleteTask", error: err.message});
}
}

