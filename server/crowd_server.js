AtlassianCrowd = Npm.require('atlassian-crowd');
var Future = Npm.require('fibers/future');
ATLASSIAN_CROWD_CONFIG = {};
var instance = null;
AtlassianCrowd.instance = function(){
    if(!instance){
        instance = new AtlassianCrowd(ATLASSIAN_CROWD_CONFIG);
    }
    return instance;
}

var loginWithAtlassianCrowdSync = function (username, password) {
    if (!ATLASSIAN_CROWD_CONFIG.crowd || !ATLASSIAN_CROWD_CONFIG.crowd.base) {
        throw new Meteor.Error("Malformed config", "crowd.base is not defined");
    }
    if (!ATLASSIAN_CROWD_CONFIG.application.name) {
        throw new Meteor.Error("Malformed config", "application.name is not defined");
    }
    if (!ATLASSIAN_CROWD_CONFIG.application.password) {
        throw new Meteor.Error("Malformed config", "application.password is not defined");
    }

    var syncFuture = new Future();
    AtlassianCrowd.instance().user.authenticate(username, password, function (err, res) {
            syncFuture.return({
                error: err ? err.message : null,
                success: res
            });
    });

    return syncFuture.wait();
}

Accounts.registerLoginHandler("atlassianCrowd", function (loginRequest) {
    if (!loginRequest.atlassianCrowdAuth) {
        return undefined;
    }
    var u = loginRequest.atlassianCrowdAuth.crowdUsername;
    var p = loginRequest.atlassianCrowdAuth.crowdUserPassword;

    var result = loginWithAtlassianCrowdSync(u, p);

    if (result.error) {
        throw new Meteor.Error("Invalid credentials", result.error);
    } else {
        var res = result.success;
        var userId = null;
        var stampedToken = {
            token: null
        };
        var username = res.name;
        if (!res.active) {
            throw new Meteor.Error("Not Active", "User exists but is not active");
        }
        // Look to see if user already exists
        var user = Meteor.users.findOne({
            username: username
        });
        if (user) {
            // Set initial userId and token vals
            userId = user._id;

            // Create hashed token so user stays logged in
            stampedToken = Accounts._generateStampedLoginToken();
            var hashStampedToken = Accounts._hashStampedToken(stampedToken);
            // Update the user's token in mongo
            Meteor.users.update(userId, {
                $push: {
                    'services.resume.loginTokens': hashStampedToken
                }
            });
        } else {
            var userObject = {
                username: username,
                profile: {}
            };
            // Set email
            if (res.email) userObject.email = res.email;
            if (res['display-name']) {
                userObject.profile.displayName = res['display-name'];
            }

            userId = Accounts.createUser(userObject);
        }
        return {
            userId: userId,
            token: stampedToken.token
        };
    }
});

