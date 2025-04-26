const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
});

const TOKEN = 'TON_TOKEN_ICI'; // Remplace avec ton token

client.once('ready', () => {
  console.log('Bot est prêt !');
});

client.on('messageDelete', (message) => {
  console.log('Un message a été supprimé !');

  if (message.guild) {
    const logChannel = message.guild.channels.cache.find(ch => ch.name === 'log-channel');
    if (logChannel) {
      const now = new Date();
      const date = now.toLocaleDateString('fr-FR');
      const time = now.toLocaleTimeString('fr-FR');

      let logMessage = `🗑️ **Message supprimé** :
      - **Auteur :** ${message.author.tag}
      - **Salon :** #${message.channel.name}
      - **Date :** ${date}
      - **Heure :** ${time}
      - **Contenu :** "${message.content}"`;

      // Si le message contient des fichiers, loguer les liens
      if (message.attachments.size > 0) {
        message.attachments.forEach(attachment => {
          logMessage += `\n**Fichier supprimé :** ${attachment.url}`;
        });
      }

      // Envoi du log dans le canal de logs
      logChannel.send(logMessage);
    }
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.content !== newMessage.content) {
    const now = new Date();
    const date = now.toLocaleDateString('fr-FR');
    const time = now.toLocaleTimeString('fr-FR');
  
    const logChannel = oldMessage.guild.channels.cache.find(ch => ch.name === 'log-channel');
    if (logChannel) {
      logChannel.send(`✏️ **Message édité** :
  - **Auteur :** ${oldMessage.author.tag}
  - **Salon :** #${oldMessage.channel.name}
  - **Date :** ${date}
  - **Heure :** ${time}
  - **Avant :** "${oldMessage.content}"
  - **Après :** "${newMessage.content}"`);
    }
  }
});

client.login(process.env.TOKEN);
