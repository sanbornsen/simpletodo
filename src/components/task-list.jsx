var React = require('react');
var CheckBox = require('material-ui/lib/checkbox');
var Actions = require('./../actions/actions');
var DeleteIcon = require('material-ui/lib/svg-icons/action/delete');
var ArrowUp = require('material-ui/lib/svg-icons/navigation/arrow-upward');
var ArrowDown = require('material-ui/lib/svg-icons/navigation/arrow-downward');

var TaskList = React.createClass({

	getInitialState: function() {
		return {
			actionDisplay: 'none'
		}
	},

	onCheck: function(event, checked) {
		Actions.checkTask(this.props.group_id, this.props.task_id, checked);
	},

	handleDelete: function() {
		Actions.deleteTask(this.props.group_id, this.props.task_id);
	},

	handlePushUp: function() {
		if (this.props.prev_task_id > -1) { // If not the first element
			Actions.swapTaskPosition(this.props.group_id, this.props.task_id, this.props.prev_task_id);
		}
	},

	handlePushDown: function() {
		if (this.props.next_task_id > -1) { // If not the last eleemnt
			Actions.swapTaskPosition(this.props.group_id, this.props.task_id, this.props.next_task_id);
		}
	},

	handleMouseEnter: function() {
		this.setState({actionDisplay: 'block'});
	},

	handleMouseLeave: function() {
		this.setState({actionDisplay: 'none'});
	},

	render: function() {
		return <div style={styles.taskList}
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}>
					<CheckBox
						label={this.props.task_name}
						checked={this.props.task_done}
						style={styles.checkbox}
						onCheck={this.onCheck}/>

					<div style={{display: this.state.actionDisplay}}>
						<ArrowUp style={styles.iconStyle} onClick={this.handlePushUp} />
						<ArrowDown style={styles.iconStyle} onClick={this.handlePushDown} />
						<DeleteIcon style={styles.iconStyle} onClick={this.handleDelete} />
					</div>
				</div>
	}
});

var styles = {
	taskList: {
    	display: 'flex',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	padding: 2.5,
	},

	checkbox: {
		width: '80%'
	},

	iconStyle: {
		fill: '#A09F9E',
		cursor: 'pointer',
		height: 20,
		width: 20
	}
}

module.exports = TaskList;