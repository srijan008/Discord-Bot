require('dotenv').config();
const { REST, Routes, ApplicationCommand, ApplicationCommandOptionType } = require('discord.js');
const { type } = require('os');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
    {
        name: 'embed',
        description: 'Sends an embed!'
        
    },
  {
    name: 'add',
    description: 'Adds two numbers',
    options: [
        {
            name: 'first-number',
            description: 'The first number',
            type: ApplicationCommandOptionType.Number,
            choices: [
                {
                    name: 'One',
                    value: 1
                },
                {
                    name: 'Two',
                    value: 2
                }
            ],
            required: true,
        },
        {
            name: 'second-number',
            description: 'The second number',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ]
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error reloading application (/) commands:', error);
  }
})();
