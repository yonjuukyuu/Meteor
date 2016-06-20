/**
 * Created by danielsilva on 17/06/16.
 */

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('sparta_layout', {top: 'banner', main: 'search'});
    }
});
FlowRouter.route('/backend', {
    action: function() {
        BlazeLayout.render('sparta_layout', {main: 'admin'});
    }
});

FlowRouter.route('/apartment/:postId', {
    name: "posts",
    action: function(params, queryParams) {
        BlazeLayout.render('sparta_layout', {main: 'posts'});
    }
});
