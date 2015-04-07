## A Meteor package for the Atlassian Crowd.

To add:
<pre>
meteor add zuzel:atlassian-crowd
</pre>

## Documentation

Access the module in js with <code>AtlassianCrowd.instance()</code>.

You can create an instance with different options by <code>new AtlassianCrowd(YOUR_OPTIONS)</code>.

The package exposes <code>Meteor.loginWithCrowd(username, password, callback)</code> method for login. This method automatically creates a new Meteor user if not exists.

## Config

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

## Example Client
<pre>
	var username = form.find("#username").val()
        var pass = form.find("#password").val()
	Meteor.loginWithCrowd(username, pass, callback);
</pre>
## Example Server
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

## API ##

#### Testing Configuration and Connectivity ####
A simple function to check connectivity to Atlassian Crowd.

ping(callback)

* callback Function (err, res)

```javascript
AtlassianCrowd.instance().ping(function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res)
  }
});
```

#### Search Users or Groups ####
Uses the Crowd Query Language  
See [Crowd Query Language Documenation](https://developer.atlassian.com/display/CROWDDEV/Crowd+Query+Language) for more details  
search(entityType, query, callback)

* entityType String 'user' or 'group'
* query String Crowd Query

#### Search Users #####
```javascript
AtlassianCrowd.instance().search('user', 'firstName="test*"', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

##### Search Groups #####
```javascript
AtlassianCrowd.instance().search('group', 'name="*test*"', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

### User Related Functions ###
Here you can find utilities for Managing, Creating, Removing, Users as well as Changing Passwords, and Basic Authentication (NON SSO).

#### Finding a User by Username ####
user.find(userrname, callback)

* username String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.find('user', function(err, res) {
  if(err) { 
    throw err;
   }
  else {
    console.log(res);
  }
});
```

#### Checking if User is Active ####
user.active(username, callback)  

* username String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.active('user', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res.toString());
  }
});
```

#### Creating a User ####
user.create(firstname, lastname, displayname, email, username, password, callback)  

* firstname String
* lastname String
* displayname String
* email String
* username String
* password String
* callback Function (err)

```javascript
AtlassianCrowd.instance().user.create('Test', 'User', 'Test User', 'test@foo.bar', 'testuser', 'abc123', function(err) {
  if(err) { 
    throw err;
  }
  else {
    console.log('Success')
  }
});
```

#### Removing a User ####
user.remove(username, callback)  

* username String
* callback Function (err)

```javascript
AtlassianCrowd.instance().user.remove('testuser', function(err) {
  if(err) { 
    throw err;
  }
  else {
    console.log('Success')
  }
});
```

#### List a Users Group Membership ####
user.groups(username, callback)  

* username String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.groups('testuser', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### List a Users Attributes ####
user.attributes(username, callback)

* username String
* callback Function (err, res) 
   
```javascript
AtlassianCrowd.instance().user.attributes('testuser', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### Set a New Attribute to a User ####
user.setAttributes(username, name, values, callback)

* username String
* name String
* values String **or** Array
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.removeAttribute('testuser', 'attributeName', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### Remove an Attribute From a User ####
user.removeAttribute(username, name, values, callback)

* username String
* name String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.attributes('testuser', 'attributeName', 'attributeValue', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### User Authentication (NON SSO) ####
user.authenticate(username, password, callback)  

* username String
* password String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().user.authenticate('testuser', 'abc123', function(err, res) {
  if(err) { 
    throw err;
   }
  else {
    console.log(res);
  }
});
```

#### Changing a Users Password ####
user.changepassword(username, newpassword)

* username String
* newpassword String
* callback Function (err)

```javascript
AtlassianCrowd.instance().user.changepassword('testuser', 'newpass', function (err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Success');
  }
});
```

### Group Functions ###
Here you can find utilities for Managing, Creating, and Removing Groups.  

#### Finding a Group ####
groups.find(groupname, callback)  

* groupname String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().groups.find('crowd-administrators', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### Creating a Group ####
groups.create(name, description, callback)

* name String
* description String
* callback Function (err)

```javascript
AtlassianCrowd.instance().groups.create('test-group', 'Test Description', function(err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Success');
  }
});
```

#### Removing a Group ####
groups.remove(name, callback)

* name String
* callback Function (err)

```javascript
AtlassianCrowd.instance().groups.remove('test-group', function (err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Success');
  }
```

#### Adding a User to a Group ####
groups.addmember(username, group, callback)

* username String
* group String
* callback Function (err)

```javascript
AtlassianCrowd.instance().groups.addmember('testuser', 'test-group', function (err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Success');
  }
});
```

#### Removing a User from a Group ####
groups.removemember(username, group, callback)

* username String
* group String
* callback Function (err)

```javascript
AtlassianCrowd.instance().groups.removemember('testuser', 'test-group', function (err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Success');
  }
});
```

#### Find the Direct Members of a Group ####
groups.directmembers(groupname, callback)

* groupname String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().groups.find('test-group', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### Find the Nested Members of a Group ####
groups.nestedmembers(groupname, callback)

* groupname String
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().groups.nestedmembers('test-group', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

### Session Functions ###
Provides SSO Functionality

#### Create a new Session ####
session.create(username, password, callback)

* username String
* password String
* remote_addr String (optional)
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().session.create('testuser', 'secret', function (err, token) {
  if(err) {
    throw err;
  }
  else {
    console.log(token);
  }
});
```

#### Authenticate ####
session.authenticate(token, remote_addr, callback)

* token String
* remote_addr String (optional)
* callback Function (err, res)

```javascript
AtlassianCrowd.instance().session.authenticate('xAbCd345', '192.168.1.100', function (err, res) {
  if(err) {
    throw err;
  }
  else {
    console.log(res);
  }
});
```

#### Destroy ####
session.destroy(token, callback)

* token String
* callback Function (err)

```javascript
AtlassianCrowd.instance().session.destroy('xAbCd345', function (err) {
  if(err) {
    throw err;
  }
  else {
    console.log('Successfully Destroyed Session');
  }
});
```

## How to allow your application to communicate with Crowd?

Use Crowd's 'Add Application' Wizard:
https://confluence.atlassian.com/display/CROWD/Adding+an+Application#AddinganApplication-add

## Kudos

Uses the node package atlassian-AtlassianCrowd.instance(). Instead of using v0.4.4 from April 2013, uses last commit with a lot of improvements including solid error handling. 
https://www.npmjs.com/package/atlassian-crowd


