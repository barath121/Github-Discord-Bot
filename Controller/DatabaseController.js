const mongoose = require('mongoose')
const User = require('./../Model/User')
const Discord = require('discord.js');
const https = require('https')
module.exports.AddUsername = (name, msg, did) => {
    const UserEmbed = new Discord.MessageEmbed()
        .setColor('#fc9d03')
        .setTimestamp()
        .setFooter('Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    if (!name) {
        UserEmbed
            .setTitle("Some Error")
        msg.reply(UserEmbed)
    }
    else {
        User.create({
            discordid: msg.author.id,
            username: name
        })
            .then(() => {
                UserEmbed
                    .setTitle("Username Added")
                    .addField("Username", name, false)
                msg.reply(UserEmbed)

            })
            .catch(err => {
                if (err) {
                    if (err) {
                        UserEmbed
                            .setTitle("Some Error")
                        msg.reply(UserEmbed)
                    }
                }
            })
    }
}

module.exports.AddPortfolio = (foliolink, msg, did) => {
    const UserEmbed = new Discord.MessageEmbed()
        .setColor('#fc9d03')
        .setTimestamp()
        .setFooter('Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    if (!foliolink) {
        UserEmbed
            .setTitle("Some Error")
        msg.reply(UserEmbed)
    }
    else {
        User.findOneAndUpdate({ discordid: msg.author.id }, {
            portfolio: foliolink
        })
            .then(() => {
                UserEmbed
                    .setTitle("Resume Added")
                    .addField("Resume", foliolink, false)
                msg.reply(UserEmbed)

            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    if (err) {
                        UserEmbed
                            .setTitle("Some Error")
                        msg.reply(UserEmbed)
                    }
                }
            })
    }
}

module.exports.AddFavRepo = (repo, msg, did) => {
    const UserEmbed = new Discord.MessageEmbed()
        .setColor('#fc9d03')
        .setTimestamp()
        .setFooter('Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    if (!repo) {
        UserEmbed
            .setTitle("Some Error")
        msg.reply(UserEmbed)
    }
    else {
        User.findOneAndUpdate({ discordid: msg.author.id }, {
            showrepo: repo
        })
            .then((result) => {
                if (!result) {
                    UserEmbed
                        .setTitle("Please add Username First")
                    msg.reply(UserEmbed)
                }
                else {
                    UserEmbed
                        .setTitle("Highlighted Repository Added")
                        .addField("Highlighted Repository", repo, false)
                    msg.reply(UserEmbed)
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                    if (err) {
                        UserEmbed
                            .setTitle("Some Error")
                        msg.reply(UserEmbed)
                    }
                }
            })
    }
}

module.exports.ShowDetails = (msg) => {
    const UserEmbed = new Discord.MessageEmbed()
        .setColor('#fc9d03')
        .setTimestamp()
        .setFooter('Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    User.findOne({ discordid: msg.author.id })
        .then((result) => {
            if (!result) {
                UserEmbed
                    .setTitle("Please add Username First")
                msg.reply(UserEmbed)
            }
            else {
                
                    const options = {
                        host: 'api.github.com',
                        path: "/users/"+result.username,
                        headers: {
                            "User-Agent": "Disc"
                        }
                    }
                    https.get(options, (resp) => {
                        let data = '';
                        resp.on('data', (chunk) => {
                            data += chunk;
                        });
                        resp.on('end', () => {
                            UserEmbed
                            .setTitle(result.username)
                            .setThumbnail(JSON.parse(data).avatar_url)
                            .setURL('https://github.com/' + result.username)
                        if (result.showrepo) {
                            UserEmbed
                                .addFields(
                                    { name: 'Highlighted Repository', value: result.showrepo, inline: false },
                                    { name: 'Repository Link', value: "https://github.com/" + result.username + "/" + result.showrepo, inline: false })
                        }
                        if (result.portfolio) {
                            UserEmbed
                                .addFields(
                                    { name: 'Resume', value: result.portfolio, inline: false },
                                )
                        }
                        msg.reply(UserEmbed)
                        });

                    }).on("error", (err) => {
                        console.log("Error: " + err.message);
                    });
              
               
            }
        })
        .catch(err => {
            if (err) {
                console.log(err)
                if (err) {
                    UserEmbed
                        .setTitle("Some Error")
                    msg.reply(UserEmbed)
                }
            }
        })
}
