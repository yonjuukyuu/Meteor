/**
 * Created by danielsilva on 17/06/16.
 */

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render('sparta_layout', {top: 'banner', main: 'search'});
    }
});
FlowRouter.route('/backend/dashboard', {
    action: function() {
        BlazeLayout.render('sparta_layout', {main: 'admin'});
    }
});

FlowRouter.route('/backend', {
    name: "backend"
    /*action: function() {
        BlazeLayout.render('admin_main', {login: 'login', register: 'register'});
    }*/
});

FlowRouter.route('/apartment/:postId', {
    name: "posts",
    action: function(params, queryParams) {
        BlazeLayout.render('sparta_layout', {main: 'posts'});
    }
});
