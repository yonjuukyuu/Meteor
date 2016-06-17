/**
 * Created by danielsilva on 15/06/16.
 */
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Apartment } from '../../imports/apartament.js';


Template.search.onCreated( () => {
    let template = Template.instance();
    template.searchQuery = new ReactiveVar();
    template.searching   = new ReactiveVar( false );

    template.autorun( () => {
        template.subscribe( 'apartments', template.searchQuery.get(), () => {
            setTimeout( () => {
                template.searching.set( false );
            }, 300 );
        });
    });
});

Template.search.helpers({
    searching() {
        return Template.instance().searching.get();
    },
    query() {
        return Template.instance().searchQuery.get();
    },
    apartment() {
        let apartment = Apartment.find();

        if ( apartment ) {
            return apartment;
        }
    }
});

Template.search.events({
    'keyup [name="search"], click .btn-submit' ( event, template ) {
        var value = $('#searchEngine').val();

        if ( (value !== '' && event.type === 'click') || value !== '' && event.keyCode === 13 ) {
            template.searchQuery.set( value );
            template.searching.set( true );
        }

        if ( value === '' ) {
            template.searchQuery.set( value );
        }
    }
});

Template.posts.onCreated(function() {
    var self = this;
    let template = Template.instance();

    self.autorun(function() { // Stops all current subscriptions
    var id = FlowRouter.getParam('postId'); // Get the collection id from the route parameter
    template.subscribe('apartments', id)
    });
});

Template.posts.helpers({
    apartment() {
        let apartment = Apartment.find();

        if ( apartment ) {
            return apartment;
        }
    }
});
