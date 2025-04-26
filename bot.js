const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
});

const TOKEN = 'TON_TOKEN_ICI'; // Replace with token

client.once('ready', () => {
  console.log('Bot ready !');
});

client.on('messageDelete', (message) => {
  console.log('Message deleted!');

  if (message.guild) {
    const logChannel = message.guild.channels.cache.find(ch => ch.name === 'log-channel');
    if (logChannel) {
      const now = new Date();
      const date = now.toLocaleDateString('en-EN');
      const time = now.toLocaleTimeString('en-EN');

      let logMessage = `🗑️ **Message delete** :
      - **Autor :** ${message.author.tag}
      - **Channel :** #${message.channel.name}
      - **Date :** ${date}
      - **Time :** ${time}
      - **Content :** "${message.content}"`;

      if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
          logMessage += `\n**Files deleted :** ${attachment.url}`;
        });
      }


      logChannel.send(logMessage);
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.content !== newMessage.content) {
    const now = new Date();
    const date = now.toLocaleDateString('en-EN');
    const time = now.toLocaleTimeString('en-EN');
  
    const logChannel = oldMessage.guild.channels.cache.find(ch => ch.name === 'log-channel');
    if (logChannel) {
      logChannel.send(`✏️ **Message edited** :
  - **Autor :** ${oldMessage.author.tag}
  - **Chan :** #${oldMessage.channel.name}
  - **Date :** ${date}
  - **Time :** ${time}
  - **Before :** "${oldMessage.content}"
  - **After :** "${newMessage.content}"`);
    }
  }
});

client.login(process.env.TOKEN);
