const { Sequelize, DataTypes, Model } = require("sequelize")
const path = require('path')


// Create new database, linked with Sequelize, e.g. const db = new Sequelize("sqlite::memory:")
// You can change the configuration of the database depending if your environment is 'test','production' etc.
// process.env.NODE_ENV = 'test'
const connectionSettings = {
    test: { dialect: 'sqlite', storage: 'sqlite::memory:' },
    dev: { dialect: 'sqlite', storage: path.join(__dirname, 'data.db'), logging: false },
    production: { dialect: 'postgres', protocal: 'postgres' }
}
const db = process.env.NODE_ENV === 'production' ?
    new Sequelize(process.env.DATABASE_URL, connectionSettings[process.env.NODE_ENV]) :
    new Sequelize(connectionSettings[process.env.NODE_ENV])

// Create our classes that extends sequelize.Model
class Board extends Model {}
class Task extends Model {}
class User extends Model {}
class Suggestion extends Model {}

//Initialise our classes:  Class.init({columns},{table})
//Sequelize deals with foreign keys so you don't explicitly have to state as a field
Board.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING
}, { sequelize: db })

Task.init({
    desc: DataTypes.STRING,
    status: DataTypes.INTEGER
}, { sequelize: db })

User.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, { sequelize: db })

Suggestion.init({
    text: DataTypes.STRING,
    upVote: DataTypes.STRING,
    downVote: DataTypes.STRING
}, { sequelize: db })

Board.hasMany(Task, { as: "tasks" })
Task.belongsTo(Board)
User.hasMany(Task, { as: "tasks" })
Task.belongsTo(User)
Board.hasMany(Suggestion, { as: "suggestions" })
Suggestion.belongsTo(Board)
User.hasMany(Suggestion, { as: "suggestions" })
Suggestion.belongsTo(User)




module.exports = { Board, Task, User, Suggestion, db }