var React = require('react');
var Reflux = require('reflux');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var AppBar = require('material-ui/lib/app-bar');

var ContentAdd = require('material-ui/lib/svg-icons/content/add');
var FloatingActionButton = require('material-ui/lib/floating-action-button');

var ListCard = require('./components/list-card');
var Actions = require('./actions/actions');
var TaskStore = require('./stores/task-store');

var Main = React.createClass({

	mixins: [
		Reflux.listenTo(TaskStore, 'onTaskUpdate')
	],

	getInitialState: function() {
		return {
			taskGroups: []
		}
	},

	componentDidMount: function() {
		Actions.fetchTasks();
	},

	onTaskUpdate: function(event, taskGroupsData) {
		if (event == 'updatetasks') {
			console.log(taskGroupsData);
			this.setState({taskGroups: taskGroupsData});
		}
		if (event == 'groupdelete'){ // React rendering issue
			this.setState({taskGroups: []});
			this.setState({taskGroups: taskGroupsData});
		}
	},

	handleAddTaskGroup: function() {
		Actions.addNewTaskGroup();
	},

  	render: function() {
  		var allTaksGroups = this.state.taskGroups;
  		var TaskGroupComponents = allTaksGroups.map(function(task, index) {
  			return <ListCard {...task} key={index} group_id={index} />
  		});
  		TaskGroupComponents.reverse();
	    return <div>
	    		<AppBar
	    			showMenuIconButton={false}
	    			style={styles.appBarStyle}
	    			title="Jova ToDo" />
	    		<div style={styles.listContainer}>
	    			{TaskGroupComponents}
	    		</div>

	    		<FloatingActionButton
					secondary={true}
					onClick={this.handleAddTaskGroup}
					style={styles.floatingBtnStyle}>
      					<ContentAdd />
    			</FloatingActionButton>
	    	</div>
  }
});

var styles = {
	listContainer: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: 80
	},
	floatingBtnStyle: {
		position: 'fixed',
		top: 'calc(100% - 80px)',
		left: 'calc(100% - 80px)',
	},
	appBarStyle: {
		position: 'fixed',
		top: 0
	}
}

var element = React.createElement(Main, {});
ReactDOM.render(element, document.querySelector('.container'));
