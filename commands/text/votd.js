const axios = require("axios");

module.exports = {
  data: {
    "name": "votd",
    "description": "Shows the verse of the day.",
    "integration_types": [0,1],
    "contexts": [0,1,2]
  },
  async execute(interaction) {
    axios
      .get("https://labs.bible.org/api/?type=json&passage=votd")
      .then(function (response) {
        interaction.reply(
          `${response.data[0].text} (${response.data[0].bookname} ${response.data[0].chapter}:${response.data[0].verse})`
        );
      })
      .catch(function (error) {
        interaction.reply(
          "Sorry, but there was an error while making this request."
        );
        console.error(error);
      });
  },
};
