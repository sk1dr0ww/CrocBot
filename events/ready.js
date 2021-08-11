const chalk = require("chalk")
const config = require("../cfg/config.json")
module.exports = (client) => {
    console.log(chalk.magenta(`\nPrefix is ${config.prefix}`));
}
