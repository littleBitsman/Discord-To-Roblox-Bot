const fs = require('fs');
const config = require('./config.json')
const Discord = require('discord.js');
const IntentFlags = Discord.IntentsBitField.Flags
const bot = new Discord.Client({ intents: [IntentFlags.Guilds, IntentFlags.GuildMessages, IntentFlags.MessageContent, IntentFlags.GuildMessageReactions] })

bot.commands = new Discord.Collection();
let thing = []
let t = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
  let command = require(`./commands/${file}`);
  try {
    thing.push(command.data.toJSON())
  } catch {
    thing.push(command)
  }
  bot.commands.set(command.name, command)
}
bot.on('ready', async () => {
  console.log('This bot is online! Created by @littleBitsman.');
  t = await bot.guilds.cache.get(config.guildId).commands.set(thing)
  console.log(t)
  let statuses = config.statuses
  let i = 0
  setInterval(function () {
    let status = statuses[i]
    i++
    bot.user.setActivity(status)
    if (i >= statuses.length) i = 0
  }, 3000)
})

bot.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  try {
    bot.commands.get(interaction.commandName).execute(interaction, bot)
  } catch (error) {
    console.warn(error);
    try {
      if (interaction.replied == true) {
        await interaction.editReply({ content: 'There was an error while executing this command!', ephemeral: true })
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    } catch (err) {
      console.log(err)
      interaction.channel.send({ content: `There was an internal error.` })
    }
  }
  return
})
bot.login(config.token)
