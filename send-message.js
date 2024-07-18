require("dotenv").config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
  {
    id: "1263609650448961677",
    label: "Yellow",
  },
  {
    id: "1263609655377137786",
    label: "Green",
  },
];

client.on("ready", async () => {
  try {
    const channel = await client.channels.cache.get("1238278754158248026");
    if (!channel) return;
    
    const row = new ActionRowBuilder();
    
    roles.forEach((role) => {
      row.addComponents(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Secondary)
      );
    });

    await channel.send({
      content: 'Claim or remove a role below',
      components: [row]
    });
    process.exit()

  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);
