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
    client.user.setActivity('WordGame in '+ client.guilds.cache.size + " "+ "Servers")
	console.log(`${client.user.username} REady!`);
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
        let counter = 0
        let collector = new Discord.MessageCollector(message.channel, filter);
        collector.on('collect', (msg, col) => {
            counter++
            let frst = msg.content.substring(0,1).toLowerCase()
            
            if((msg.content.toLowerCase() === ';;stop' && (message.author.id === msg.author.id)) || counter === 100){
                counter--;
                collector.stop()
                msg.reply("Game Stopped at " + counter + " words.")
            }
            
            else{
                if (!/^[a-zA-Z]+$/i.test(msg.content) || msg.content.length < 2){
                last_char = getRandomString(1)
                msg.react('❌')
                return msg.reply("Ruined it !!" + " " + "Next Word is:" + " " +last_char)
                }
                if(last_char.toLowerCase() === frst){
                msg.react('💯')
                last_char = msg.content.substring(msg.content.length - 1)
                }
                else{
                last_char = getRandomString(1)
                msg.react('❌')
                msg.reply("Ruined it !!" + " " + "Next Word is:" + " " +last_char)  
                }
            }
            
        });
        collector.on('end', collected =>{
            console.log(collected.filter(user => !user.bot).size)
        })
    }
});

client.login(configs.token) // Replace XXXXX with your bot token