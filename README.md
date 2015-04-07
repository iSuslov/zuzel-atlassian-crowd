## A Meteor package for the Atlassian Crowd.

To add:
<pre>
meteor add zuzel:atlassian-crowd
</pre>

## Documentation

Access the module in js with <code>AtlassianCrowd.instance()</code>.

You can create an instance with different options by <code>new AtlassianCrowd(YOUR_OPTIONS)</code>.

The package exposes <code>Meteor.loginWithCrowd(username, password, callback)</code> method for login. This method automatically creates a new Meteor user if not exists.

##Config

<code>ATLASSIAN_CROWD_CONFIG</code> namespace is reserved for default Crowd configuration.
Default Crowd configuration is required if you want to use <code>Meteor.loginWithCrowd</code>. Define it somewere on a server. Example:
<pre>
	Meteor.startup(function () {
            ATLASSIAN_CROWD_CONFIG.crowd = {
                "base": "http://crowd_server:8059/crowd/"
            };
            ATLASSIAN_CROWD_CONFIG.application = {
                "name": "username",
                "password": "password"
            };
	});
</pre>

##Example Client
<pre>
	var username = form.find("#username").val()
        var pass = form.find("#password").val()
	Meteor.loginWithCrowd(username, pass, callback);
</pre>
##Example Server
<pre>
	var findCrowdUsersCallback = function (error, response) {
        	if (response) {
        	    console.error(response);
        	} else {
        	    console.error(error);
        	}
	};

	AtlassianCrowd.instance().search("user", "name=*", findCrowdUsersCallback);
</pre>


## How to allow your application to communicate with Crowd?

Use Crowd's 'Add Application' Wizard:
https://confluence.atlassian.com/display/CROWD/Adding+an+Application#AddinganApplication-add

## Kudos

Uses the node package atlassian-crowd. Instead of using v0.4.4 from April 2013, uses last commit with a lot of improvements including solid error handling. 
https://www.npmjs.com/package/atlassian-crowd

