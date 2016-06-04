var React = require('react');
var Paper = require('material-ui/lib/paper');
var Dialog = require('material-ui/lib/dialog');
var AddIcon = require('material-ui/lib/svg-icons/content/add');
var FlatButton = require('material-ui/lib/flat-button');
var TaskList = require('./task-list');
var Actions = require('./../actions/actions');
var TaskStore = require('./../stores/task-store');
var DeleteIcon = require('material-ui/lib/svg-icons/action/delete');

var ListCard = React.createClass({

	getInitialState: function() {
		return {
			zDepth: 1,
			taskDetailsDialogOpen: false,
			deleteDialogOpen: false,
			title: '',
			newTask: '',
			tasks: [],
		}
	},

	componentWillMount: function() {
		this.setState({
			title: this.props.title,
			tasks: this.props.tasks
		})
	},

	componentDidMount: function() {
		if (typeof(this.props.newly_added) != 'undefined' && this.props.newly_added){
			this.handleDetailsOpen();
		}
	},

	handleMouseEnter: function() {
		this.setState({zDepth: 2});
	},

	handleMouseLeave: function() {
		this.setState({zDepth: 1});
	},

	handleDetailsOpen: function() {
		this.setState({taskDetailsDialogOpen: true});
	},

	handleClose: function() {
		this.setState({taskDetailsDialogOpen: false});
	},

	handleTitleChange: function(event) {
		Actions.updateTitle(this.props.group_id, event.target.value)
		this.setState({title: event.target.value});
	},

	handleNewTaskChange: function(event) {
		this.setState({newTask: event.target.value});
	},

	handleNewTaskKeyPress: function(event) {
		if (event.keyCode == 13 && this.state.newTask.length) {
			Actions.addTask(this.props.group_id, this.state.newTask);
			this.setState({
				newTask: ''
			})
		}
	},

	handleGroupDelete: function() {
		Actions.deleteGroup(this.props.group_id);
	},

	closeDeleteConfirmation: function() {
		this.setState({deleteDialogOpen: false});
	},

	openDeleteConfirmation: function() {
		this.setState({deleteDialogOpen: true});
	},

	_renderTitle: function() {
		return <div>
				<input
					className={'task-group-title-input'}
					style={styles.titleInput}
					onChange={this.handleTitleChange}
					value={this.state.title} />
			</div>
	},

	_renderUndoneTaskList: function() {
		var remainingTasksArray = this.state.tasks.filter(function(task, index){
			if (!task.task_done) {
				task.group_id = this.props.group_id;
				task.task_id = index;
				return task;
			}
		}.bind(this));
		var unDoneTasks = remainingTasksArray.map(function(task, index){
			task.next_task_id = (index == remainingTasksArray.length-1) ? -1 : remainingTasksArray[index+1].task_id;
			task.prev_task_id = (index == 0) ? -1 : remainingTasksArray[index-1].task_id;
			return <TaskList {...task} key={index}/>;
		})
		return <div style={styles.taskListContainer} className={'task-list-container'}>
				{unDoneTasks}
			</div>;
	},

	_renderDoneTaskList: function() {
		var checkedTasksArray = this.state.tasks.filter(function(task, index){
			if (task.task_done) {
				task.group_id = this.props.group_id;
				task.task_id = index;
				return task;
			}
		}.bind(this));
		var doneTasks = checkedTasksArray.map(function(task, index){
			task.next_task_id = (index == checkedTasksArray.length-1) ? -1 : checkedTasksArray[index+1].task_id;
			task.prev_task_id = (index == 0) ? -1 : checkedTasksArray[index-1].task_id;
			return <TaskList {...task} key={index}/>;
		})
		return <div style={styles.taskListContainer} className={'task-list-container'}>
				{doneTasks}
			</div>;
	},

	_renderTaskInput: function() {
		return <div>
				<div style={styles.taskInputContainer}>
					<AddIcon />
					<input
						className={'task-item-input'}
						style={styles.taskInput}
						onChange={this.handleNewTaskChange}
						onKeyDown={this.handleNewTaskKeyPress}
						placeholder={'Enter a new task'}
						value={this.state.newTask} />
				</div>
			</div>;
	},

	_renderDeleteConfirmationDialog: function() {

		var actions = [<FlatButton
				        label="Cancel"
				        secondary={true}
				        onTouchTap={this.closeDeleteConfirmation}
				        onClick={this.closeDeleteConfirmation}/>,

				      <FlatButton
				        label="Delete"
				        primary={true}
				        keyboardFocused={true}
				        onTouchTap={this.handleGroupDelete}
				        onClick={this.handleGroupDelete}/>
				       ];

		return <Dialog
		          title={"Delete the "+this.props.title+"?"}
		          actions={actions}
		          modal={false}
		          open={this.state.deleteDialogOpen}>
		          	{"Do you really want to delete the group?"}
		        </Dialog>;
	},

	render: function() {
		var detailsModalActions = [<FlatButton
				        label="Close"
				        secondary={true}
				        onTouchTap={this.handleClose}
				        onClick={this.handleClose}/>];
		return <div className={'task-group-list-container'}>
					<Paper
						className={'task-group-list-item'}
						style={styles.cardStyle}
						zDepth={this.state.zDepth}
						onMouseEnter={this.handleMouseEnter}
						onMouseLeave={this.handleMouseLeave}>

						<div style={styles.titleStyle} onClick={this.handleDetailsOpen}> {this.state.title} </div>
						<div style={styles.actionStyle}>
							<DeleteIcon style={styles.iconStyle} onClick={this.openDeleteConfirmation}/>
						</div>

					</Paper>
					<Dialog
						open={this.state.taskDetailsDialogOpen}
						autoScrollBodyContent={true}
						actions={detailsModalActions}>

						{this._renderTitle()}
						{this._renderUndoneTaskList()}
						{this._renderTaskInput()}
						{this._renderDoneTaskList()}
					</Dialog>

					{this._renderDeleteConfirmationDialog()}
				</div>
	}
});

var styles = {
	cardStyle : {
		height: 50,
		margin: 10,
		textAlign: 'center',
		display: 'flex',
		padding: '15px',
		fontWeight: 300,
		cursor: 'pointer',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 0
	},

	titleInput : {
		width: '100%',
	    border: 'none',
	    fontWeight: 400,
	    outlineWidth: 0,
	    marginBottom: 20
	},

	taskInputContainer: {
		width: '100%',
    	borderTop: '1px solid',
    	borderBottom: '1px solid',
    	borderBottomColor: '#A09F9E',
    	borderTopColor: '#A09F9E',
    	display: 'flex',
    	justifyContent: 'space-around',
    	alignItems: 'center',
    	padding: '5px 0px',
    	margin: '10px 0px'
	},

	taskInput: {
		width: '80%',
	    border: 'none',
    	fontWeight: 200,
    	outlineWidth: 0
	},

	taskListContainer: {
		width: '100%',
    	display: 'flex',
    	flexDirection: 'column',
		fontWeight: 100,
	},

	iconStyle: {
		fill: '#A09F9E',
		cursor: 'pointer',
		height: 20,
		width: 20
	},

	titleStyle: {
		padding: 10,
		width: '85%',
		textAlign: 'left'
	},

	actionStyle: {
		width: '15%'
	}

};

module.exports = ListCard;

