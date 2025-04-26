const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
  ] 
});

const TOKEN = 'MTM2NTc2NjEyNjI4NTM1NzE2Nw.GWLfsK.UbDTUanV0O_yE3TsjmOezWKx9U87g1lWhCAwd0'; // Remplace avec ton token

client.once('ready', () => {
  console.log('Bot est prêt !');
});

client.on('messageDelete', (message) => {
    console.log('Un message a été supprimé !');
  
    if (message.guild) {
      const logChannel = message.guild.channels.cache.find(ch => ch.name === 'log-channel');
      if (logChannel) {
        // Si le message est partiel (non complet en mémoire)
        if (message.partial) {
          logChannel.send(`Un message a été supprimé, mais je n'ai pas pu récupérer son contenu.`);
        } else {
          // Formatage de la date/heure
          const now = new Date();
          const date = now.toLocaleDateString('fr-FR'); // Format : jj/mm/aaaa
          const time = now.toLocaleTimeString('fr-FR'); // Format : hh:mm:ss
  
          logChannel.send(`🗑️ **Message supprimé :**
  - **Auteur :** ${message.author.tag}
  - **Salon :** #${message.channel.name}
  - **Date :** ${date}
  - **Heure :** ${time}
  - **Contenu :** "${message.content}"`);
        }
      }
    }
  });

client.login(TOKEN);
