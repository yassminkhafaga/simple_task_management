// Each task includes:
// - title (required)
// - description (optional)
// - status (pending, in_progress, done)
// - created_at

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Task = sequelize.define("Task",{
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("pending", "in_progress", "done"),
            defaultValue: "pending",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,},
    },
    {
        tableName: "tasks",
    });
    User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
    Task.belongsTo(User, { foreignKey: "userId" });

    module.exports = Task;