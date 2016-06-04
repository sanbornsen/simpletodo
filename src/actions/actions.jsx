var Reflux = require("reflux");

var Actions = Reflux.createActions([
		"fetchTasks",
		"addTask",
		"checkTask",
		"deleteTask",
		"swapTaskPosition",
		"updateTitle",
		"addNewTaskGroup",
		"deleteGroup",
		"taskSize"
	]);

module.exports = Actions;