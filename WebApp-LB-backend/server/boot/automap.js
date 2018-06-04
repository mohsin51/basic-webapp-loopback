module.exports = function(app) {
    var path = require('path');
    var models = require(path.resolve(__dirname, '../model-config.json'));
    var datasources = require(path.resolve(__dirname, '../datasources.json'));

    function autoUpdateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].autoupdate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' updated');
                    });
                }
            }
        });
    }

    function autoMigrateAll(){
        Object.keys(models).forEach(function(key) {
            if (typeof models[key].dataSource != 'undefined') {
                if (typeof datasources[models[key].dataSource] != 'undefined') {
                    app.dataSources[models[key].dataSource].automigrate(key, function (err) {
                        if (err) throw err;
                        console.log('Model ' + key + ' migrated');
                    });
                }
            }
        });
    }
 

    function migrate2 () 
    {
        app.datasources.mysql.automigrate(['user','post','accessToken','Role','RoleMapping','ACL'], function(err) {
            console.log(err);
        });
        // app.datasources.mysql.automigrate(null, function(err) {
        //     console.log(err);
        // });
    }

    function autoupdate2 ()
    {
        let dataSource = app.dataSources.mysql;       
        dataSource.autoupdate(['user','post','accessToken','Role','RoleMapping','ACL'], function (err) {
            if(err) console.log(err);
        });  
        //  dataSource.autoupdate(null, function (err) {
        //     if(err) console.log(err);
        // });   
    }
   
    //TODO: change to autoUpdateAll when ready for CI deployment to production
    // migrate2();
    // autoMigrateAll();
    // autoUpdateAll();
    autoupdate2();

};

