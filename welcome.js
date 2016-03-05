var SlackBot = require('slackbots');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-24619394502-UFprDkLgIkShyXnvJz0ebHd7', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'My Bot',
    old: ''
});

bot.on('start', function() {
    var params =  {
        icon_emoji: ':speaking_head_in_silhouette:'
        //,
        //image_url: "http://www.dr.dk/drdkGlobal/spot/Images/fokusbaand/xfactor_2016.jpg"
    };    
    
    var data1 = { "attachments": [
        {
            "fallback": "Financial status",
            "title": "Current status",
            "title_link": "https://public.tableau.com/views/Exampleexpenses/Dashboard1?:embed=y&:display_count=yes&:showTabs=y&:toolbar=no",
            "text": "Illustration of your expenses",
            "image_url": "http://pop-profiles.s3.amazonaws.com/domains/finbot.co/w3rKJxebQVKwOplfZQLv_screen_shot_2016-03-05_at_18.14.04.png",
            "color": "#764FA5"
        }
    ]}
    /*var data1 = {
        attachments: [
        {
          image_url: "http://www.dr.dk/drdkGlobal/spot/Images/fokusbaand/xfactor_2016.jpg"
        }]
    }*/
    bot.postMessageToUser('nsl', 'Hi Nick. I am your advisor. I will help you get the bike.\n' +
                                 'This is how your financials looks now', data1, params);
     
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
        if (data.text == 'shutup'){
            bot.postMessageToUser('nsl', 'I will take a break for 24H. Have fun !', params);
 
        }
       console.log(data);
//       bot.postMessageToChannel('log', 'someone entered (' + data.text + ')');        
//        bot.postMessageToUser('nsl', 'hello you: ' + data.text, params);
    }
});

var old = '';

function mQue() {
  var sendmessage = false;
  
  // Read file  
  var fs = require('fs')
     , filename = "input.txt"; //process.argv[2];
  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;
    console.log('--- check  ' + new Date().toString() + data);  
    
    if (data != old){
      sendmessage = true;    
    }
    old = data;
  
    var params = {
        icon_emoji: ':+1:'    
    };
  
    if (data == "MUCH SPEND" && sendmessage){
      params = {
        icon_emoji: ':-1:'    
      };
      
      bot.postMessageToUser('nsl', 'Hi Nick. You spend 800 kr yesterday at at bar. This will delay the bike with a month. \n' +
                                   'I will keep my eyes on you', params);
      bot.postMessageToChannel('log', 'to much spent sent (' + new Date().toString() + ')');         
      console.log("MUCH SPEND !!!");    
    }  
  
    if (data == "WEEK" && sendmessage)
    {
      params = {
        icon_emoji: ':+1:'    
      };

      bot.postMessageToUser('nsl', 'Hey - you only spend 150 kr last night.\n' +
                            'https://media.giphy.com/media/byfdmRqwNKYec/giphy.gif', params);

      bot.postMessageToChannel('log', 'week sendt (' + new Date().toString() + ')');         
        
      console.log("--> SEND WEEK");   
    }
    return old;
  });
  
}

setInterval(function() {
   mQue(); 
}, 1000);


/*setTimeout(function() {
   hello(); 
}, 1000);
*/
    

// He will be at a bar
// Next Morning: We send a message: "Hi Nick. You spend 800 kr yesterday at at bar. This will delay the bike with a month. Sad gif."
// "I will keep my eyes on you"
// "Shutup""
// "Ok. I will not nag you for 24 hours. Have fun."
//
// Hey - you only spend 150 kr last 

console.log('hello');