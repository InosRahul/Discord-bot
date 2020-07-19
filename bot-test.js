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

var last_char = new Array(getRandomString(1));

client.once('ready', message => {
    var channel = client.channels.cache.find(cname => cname.name === 'word-game')
    channel.send({embed: {
    color: 3447003,
    title: "This is a New Random Word" + " " + last_char,
    description: "Your word should start from:" +" "+ `${last_char}`,
    timestamp: new Date(),
    footer: {
      text: "WordGame Bot"
    }
    }})
	console.log('REady!');
});

client.on('message', message => {
    if(message.author.bot) return;
    if (!/^[a-zA-Z]+$/i.test(message.content) || message.content.length < 2){
        last_char.push(getRandomString(1))
        last_char.shift()
        message.react('❌')
        return message.reply("Runied it !!" + " " + "Next Word is:" + " " +last_char)
    }

    var frst = message.content.substring(0,1).toLowerCase()
    
    if(last_char[0].toLowerCase() === frst){
        last_char.push(message.content.replace(/[^\w\s]/gi,'').substring(message.content.length-1));
        last_char.shift()
        message.react('💯')
    }
    else{
        last_char.push(getRandomString(1))
        last_char.shift()
        message.react('❌')
        return message.reply("Runied it !!" + " " + "Next Word is:" + " " +last_char)                 
    }   
});

client.login(configs.token) // Replace XXXXX with your bot token