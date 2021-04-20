const Discord = require('discord.js');
exports.run = async (client , message, args ) => {
const bilal = new Discord.MessageEmbed()
.setColor("RANDOM")
.setTitle(`Ping Pong!`)
.setDescription(`**Pingim ${client.ws.ping} MS**`)
message.channel.send(bilal)
};
exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 0
}
exports.help = {
name: 'ping'
};