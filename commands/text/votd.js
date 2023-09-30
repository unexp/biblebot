const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("votd")
    .setDescription("Show the verse of the day."),
  async execute(interaction) {
    axios
      .get("https://labs.bible.org/api/?type=json&passage=votd")
      .then(function (response) {
        interaction.reply(`${response.data[0].text} (${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse})`)
      });
  },
};
