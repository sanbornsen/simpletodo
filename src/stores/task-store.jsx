var Reflux = require("reflux");
var Actions = require("./../actions/actions");

var TaskStore = Reflux.createStore({
	listenables: [Actions],

	taskGroups: [],

	fetchTasks: function() {
		try{
			this.taskGroups = JSON.parse(this.getCookie('jovatodo'));
		} catch(err) {
			console.log('Cookie not found');
			this.taskGroups = [];
		}
		this.triggerTaskUpdate();
	},

	addTask: function(index, task_name) {
		this.taskGroups[index].tasks.push({
			task_name: task_name,
			task_done: false,
		});
		this.triggerTaskUpdate();
	},

	deleteTask: function(group_id, task_id) {
		this.taskGroups[group_id].tasks.splice(task_id, 1);
		this.triggerTaskUpdate();
	},

	checkTask: function(group_id, task_id, checked) {
		this.taskGroups[group_id].tasks[task_id].task_done = checked;
		this.triggerTaskUpdate();
	},

	swapTaskPosition: function(group_id, task_id, swap_id) {
		var tmp = this.taskGroups[group_id].tasks[task_id];
		this.taskGroups[group_id].tasks[task_id] = this.taskGroups[group_id].tasks[swap_id];
		this.taskGroups[group_id].tasks[swap_id] = tmp;
		this.triggerTaskUpdate();
	},

	updateTitle: function(group_id, title) {
		this.taskGroups[group_id].title = title;
		this.updateCookie();
	},

	addNewTaskGroup: function() {
		this.taskGroups.push({
			title: 'New Task Group',
			tasks: [],
			newly_added: true
		})
		this.triggerTaskUpdate();
		this.taskGroups[this.taskGroups.length-1].newly_added = false;
		this.updateCookie();
	},

	deleteGroup: function(group_id) {
		this.taskGroups.splice(group_id, 1);
		this.triggerTaskUpdate('groupdelete');
	},

	getCookie:  function(cname) {
		var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return [];
	},

	setCookie:  function(cname, cvalue, exdays) {
		var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + "; " + expires;
	},

	updateCookie: function() {
		this.setCookie('jovatodo', JSON.stringify(this.taskGroups), 365);
	},

	triggerTaskUpdate: function(event) {
		this.updateCookie();
		if (typeof(event) == 'undefined'){
			this.trigger('updatetasks', this.taskGroups);
		} else {
			this.trigger(event, this.taskGroups);
		}
	},

});

module.exports = TaskStore;