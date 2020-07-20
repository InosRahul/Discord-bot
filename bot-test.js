const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()
client.commands = new Discord.Collection(); 

function getRandomString(length=1) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

const configs = {
    token : process.env.BOT_TOKEN,
    prefix : process.env.PREFIX
}

client.once('ready', () => {
    
	console.log('REady!');
});


client.on('message',  message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() === ';;start'){
        let last_char = getRandomString(1)
        message.channel.send({embed: {
            color: 3447003,
            title: "This is a New Random Word" + " " + last_char,
            description: "Your word should start from:" +" "+ last_char,
            timestamp: new Date(),
            footer: {
              text: "WordGame Bot"
            }
            }});
        let filter = m => !m.author.bot;
        let collector = new Discord.MessageCollector(message.channel, filter);
        collector.on('collect', (message, col) => {
            // console.log('Collected messages: '+ message.content);
            let frst = message.content.substring(0,1).toLowerCase()
            if (!/^[a-zA-Z]+$/i.test(message.content) || message.content.length < 2){
                last_char = getRandomString(1)
                message.react('❌')
                return message.reply("Runied it !!" + " " + "Next Word is:" + " " +last_char)
            }
            if(last_char.toLowerCase() === frst){
                message.react('💯')
                last_char = message.content.substring(message.content.length - 1)
                // console.log(last_char)
            }
            else{
                last_char = getRandomString(1)
                message.react('❌')
                message.reply("Runied it !!" + " " + "Next Word is:" + " " +last_char)  
            }
        });
    }
});

client.login(configs.token) // Replace XXXXX with your bot token