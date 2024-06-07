const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: {
    "name": "search",
    "description": "Look up a passage or chapter from the Holy Bible",
    "options": [{
      "name": "search",
      "description": "The passage or chapter you want to read (Ex. Genesis 1 or Genesis 1:1)",
      "type": 3
    }],
    "integration_types": [0,1],
    "contexts": [0,1,2]
  },
  async execute(interaction) {
    var fullQuote = "";
    axios
      .get(
        `https://labs.bible.org/api/?type=json&passage=${interaction.options.getString(
          "search"
        )}`
      )
      .then(function (response) {
        response.data.forEach((passage) => {
          fullQuote =
            fullQuote +
            `${passage.text} (${passage.bookname} ${passage.chapter}:${passage.verse})\n`;
        });

        if (fullQuote.length > 2000) {
          let txtpassage = new AttachmentBuilder(Buffer.from(fullQuote), {
            name: "passage.txt",
          });
          interaction.reply({ files: [txtpassage] });
        } else {
          interaction.reply(fullQuote);
        }
      })
      .catch(function (error) {
        interaction.reply(
          `Something went wrong with your request. Make sure to format your query as such: "Genesis 1:1".`
        );

        console.error(error);
      });
  },
};
