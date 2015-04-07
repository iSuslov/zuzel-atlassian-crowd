# meteor-atlassian-crowd
A Meteor package for the Atlassian Crowd nodejs module.


## Documentation

Access the module in js as <code>AtlassianCrowd.instance()</code>.

You can create an instance with different options by <code>new AtlassianCrowd(YOUR_OPTIONS)</code>.

The package exposes <code>Meteor.loginWithCrowd(username, password, callback)</code> method for login. This method automatically creates a new Meteor user if not exists.

##Config

<code>ATLASSIAN_CROWD_CONFIG</code> namespace is reserved for default Crowd configuration.
Default Crowd configuration is required if you want to use <code>Meteor.loginWithCrowd</code>
<pre>
            ATLASSIAN_CROWD_CONFIG.crowd = {
                "base": "http://crowd_server:8059/crowd/"
            };
            ATLASSIAN_CROWD_CONFIG.application = {
                "name": "username",
                "password": "password"
            };

</pre>

## Using Crowd's 'Add Application' Wizard to allow your application to communicate with it.

More info here:
https://confluence.atlassian.com/display/CROWD/Adding+an+Application#AddinganApplication-add

## Kudos

Uses the node package atlassian-crowd. Instead of using v0.4.4 from April 2013, uses last commit with a lot of improvements including error handling.
https://www.npmjs.com/package/atlassian-crowd

