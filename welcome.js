var SlackBot = require('slackbots');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-24619394502-UFprDkLgIkShyXnvJz0ebHd7', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'My Bot'
});

bot.on('start', function() {
    var params =  {
        icon_emoji: ':speaking_head_in_silhouette:'
    };    
    
    bot.postMessageToUser('nsl', 'Hi Nick. I am your advisor. I will help you get the bike.', params);
    bot.postMessageToUser('nsl', 'This is how your financials looks now', params); 
    bot.postMessageToChannel('log', 'welcome sendt (' + new Date().toString() + ')');         
});

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm 
    //console.log(data);
    
    var params = {
        icon_emoji: ':cat:'    
    };
    
    if (data.type === 'message')
    {
       console.log(data);
       bot.postMessageToChannel('log', 'someone entered (' + data.text + ')');        
//        bot.postMessageToUser('nsl', 'hello you: ' + data.text, params);
    }
});



// He will be at a bar
// Next Morning: We send a message: "Hi Nick. You spend 800 kr yesterday at at bar. This will delay the bike with a month. Sad gif."
// "I will keep my eyes on you"
// "Shutup""
// "Ok. I will not nag you for 24 hours. Have fun."
//
// Hey - you only spend 150 kr last 

console.log('hello');