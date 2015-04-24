Package.describe({
	git: 'https://github.com/iSuslov/zuzel-atlassian-crowd.git',
	name: 'zuzel:atlassian-crowd',
	version: '0.0.5',
	summary: 'A Meteor package for Atlassian Crowd.',
	documentation: 'README.md'

});

Package.onUse(function(api) {

	api.versionsFrom('1.0');
    api.use(['accounts-base', 'accounts-password'], 'server');
	api.add_files( ['client/crowd_client.js'], 'client' );
	api.add_files( ['server/crowd_server.js'], 'server' );

	api.export('AtlassianCrowd', 'server');
    api.export('ATLASSIAN_CROWD_CONFIG', 'server');

});

Npm.depends({ 'atlassian-crowd': 'https://github.com/iSuslov/node-atlassian-crowd/tarball/fed846a99264fadb5d1762a0b76c27c7e857da5e' });



