/**
 * Created by danielsilva on 13/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import '../../body.html';
import { Tasks } from '../../../imports/tasks.js';

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('tasks');
});


Template.body.helpers({

    tasks() {
        const instance = Template.instance();
        if (instance.state.get('hideCompleted')) {
            // If hide completed is checked, filter tasks
            return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
        }
        // Otherwise, return all of the tasks
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
    incompleteCount() {
        return Tasks.find({ checked: { $ne: true } }).count();
    },
    isOwner() {
        return this.owner === Meteor.userId();
    }
});

Template.task.helpers({
    isOwner() {
        return this.owner === Meteor.userId();
    },
});



Template.body.events({
    'submit .new-task'(event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        const text = target.text.value;

        // Insert a task into the collection
       /* Tasks.insert({
            text,
            createdAt: new Date(), // current time
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });*/

        Meteor.call('tasks.insert', text);


        // Clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance) {
        instance.state.set('hideCompleted', event.target.checked);
    }
});

Template.task.events({
    'click .toggle-checked'() {
        // Set the checked property to the opposite of its current value
        /*Tasks.update(this._id, {
            $set: { checked: ! this.checked },
        });*/
        Meteor.call('tasks.setChecked', this._id, !this.checked);
        Tasks.update(taskId, { $set: { checked: setChecked } });


    },

    'click .delete'() {
            /*
                Tasks.remove(this._id);
            */
        Meteor.call('tasks.remove', this._id);
    },
    'click .toggle-private'() {
        Meteor.call('tasks.setPrivate', this._id, !this.private);
    },
});
