require('dotenv').config();
const fs = require('fs')
const {Client, Intents, Collection} = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,   
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});


const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
client.commands = new Collection()


for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for(const file of eventFiles){
    const event = require(`./events/${file}`);
    if(event.once){
        client.once(event.name, (...args) => {
            event.execute(...args, client)
        })
    }
    else{
        client.on(event.name, (...args) => {
            event.execute(...args, client)
            
        })
    }
}




client.login(process.env.TOKEN);
 

