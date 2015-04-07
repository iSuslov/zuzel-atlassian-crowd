Meteor.loginWithCrowd = function (username, password, callback) {
    var loginRequest = {
        atlassianCrowdAuth: {
            crowdUsername: username,
            crowdUserPassword: password
        }
    };

    Accounts.callLoginMethod({
        methodArguments: [loginRequest],
        userCallback: function (error, result) {
            if (error) {
                callback && callback(error);
            } else {
                callback && callback(result);
            }
        }
    });
};