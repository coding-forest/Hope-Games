require('dotenv').config();


module.exports = {
    name: 'ready',
    once: true,
    execute: async (client) => {
        const guild = client.guilds.cache.first();
        console.log('boy is finally running! ')
    }
}