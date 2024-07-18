require("dotenv").config();
const { Client, IntentsBitField, EmbedBuilder, Activity, ActivityType } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

let status = [
    {
        name: 'Under Ctrl',
        type: ActivityType.Streaming,
        url: 'https://youtu.be/brchILVjj7s?si=r_UZBhN0AN995kbf'
    },
    {
        name: 'Custom Status 1',
    },
    {
        name: 'Custom Status 2',
        type: ActivityType.Watching
    },
    {
        name: 'Custom Status 3',
        type: ActivityType.Listening
    }
]

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online`);

  setInterval(() => {
    let random = Math.floor(Math.random()*status.length);
    client.user.setActivity(status[random]);
  },5000)
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "hello") {
    message.reply("hello");
  }
});

client.on('interactionCreate', async(interaction) => {
    if(!interaction.isButton()) return;
    await interaction.deferReply({ephemeral: true})

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if(!role){
        interaction.editReply({
            content: "I could't find that role",
        })
        return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);
    if(hasRole){
        await interaction.member.roles.remove(role);
        await interaction.editReply(`The role ${role} has been removed`);
        return;
    }
    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added`);

})




client.on("interactionCreate", (intercation) => {
  if (!intercation.isChatInputCommand()) return;

  if (intercation.commandName === "hey") {
    intercation.reply("hey!!");
  }
  if (intercation.commandName === "add") {
    const num1 = intercation.options.get("first-number").value;
    const num2 = intercation.options.get("second-number").value;
    intercation.reply(`The sum is ${num1 + num2}`);
  }
  if (intercation.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("Embed title")
      .setDescription("This is an embed description")
      .setColor('Random')
      .addFields({
        name: 'Field title first',
        value: 'Some random value',
        inline: true
      })
      .addFields({
        name: 'Field title second',
        value: 'Some random value',
        inline: true
      })

      intercation.reply({embeds: [embed]});
  }
});

client.login(process.env.TOKEN);
