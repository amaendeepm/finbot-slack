var SlackBot = require('slackbots');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-24619394502-UFprDkLgIkShyXnvJz0ebHd7', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'My Bot'
});
 
bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };
    
    
    var users = bot.getUsers();
    console.log(users);
    // define channel, where bot exist. You can adjust it there https://my.slack.com/services  
    //bot.postMessageToChannel('general', 'Enter your name', params);
    
    // define existing username instead of 'user_name' 
    bot.postMessageToUser('amandeep', 'STOP USING MONEY: ' + new Date().toString(), params); 
    bot.postMessageToUser('nsl', 'STOP USING MONEY' + new Date().toString(), params); 
    
    bot.postMessageToChannel('log', 'stop using money sent (' + new Date().toString() + ')');        

    // define private group instead of 'private_group', where bot exist 
    //bot.postMessageToGroup('private_group', 'meow!', params);
    
    bot.postMessageToUser('nsl', 'hi', function(data) 
    {
        bot.postMessageToChannel('log', 'hi answered (' + data.text + ')');        
    });

     
});

/**
 * @param {object} data
 */
bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 
    console.log(data);
    
    var params = {
        icon_emoji: ':cat:'    
    };
    if (data.type === 'message')
    {
       bot.postMessageToChannel('log', 'someone entered (' + data.text + ')');        
//        bot.postMessageToUser('nsl', 'hello you: ' + data.text, params);
    }
});

