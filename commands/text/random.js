const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

// "https://labs.bible.org/api/?type=json&passage=random",

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Retrieve a random passage from the Holy Bible"),
  async execute(interaction) {
    axios
      .get("https://labs.bible.org/api/?type=json&passage=random")
      .then(function (response) {
        interaction.reply(`${response.data[0].text} (${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse})`)
        // console.log(response.data[0].text);
      });
  },
};
