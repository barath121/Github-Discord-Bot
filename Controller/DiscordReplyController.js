const Discord = require('discord.js');
const client = new Discord.Client();
module.exports.UserDetails= (User_Details, msg)=> {
    const UserEmbed = new Discord.MessageEmbed()
        .setColor('#fc9d03')
        .setTitle(User_Details.login)
        .setURL('https://github.com/' + User_Details.login)
        .setDescription(User_Details.bio ? User_Details.bio : "")
        .setThumbnail(User_Details.avatar_url)
        .addFields(
            { name: 'Following', value: User_Details.following, inline: false },
            { name: 'Followers', value: User_Details.followers, inline: false },
        )
        .addFields(
            { name: 'Public Repos', value: User_Details.public_repos, inline: true },
            { name: 'Hireable', value: User_Details.hireable?'Yes':"No", inline: false },
        )
        .setTimestamp()
        .setFooter('Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    msg.reply(UserEmbed)
}

module.exports.UserRepos = (Repos,username,msg,page) =>{
    console.log(page)
    const RepoEmbed = new Discord.MessageEmbed()
    .setColor('#fc9d03')
    .setTitle(username+"\'s Repositories")
    .setThumbnail(Repos[0].owner.avatar_url)
    .setURL('https://github.com/' +username +'?tab=repositories')
    .setTimestamp()
    .setFooter('Page '+page+' of '+Math.ceil(Object.keys(Repos).length/3)+' ,Made By Barath', 'https://avatars3.githubusercontent.com/u/42098783?v=4')
    for(repository=((page-1)*2)+1;repository<=page*2;repository++){
        RepoEmbed.addFields(
            { name: 'Name', value: Repos[repository].name, inline: true },
            { name: 'Description', value:Repos[repository].description?Repos[repository].description:"No Description", inline: false },
            { name: 'Repo Link', value:Repos[repository].html_url, inline: false },
            { name: 'Forked', value: Repos[repository].fork?'Yes':"No", inline: false },
            { name: 'Stars', value:Repos[repository].stargazers_count , inline: true },
            { name: 'Forks', value:Repos[repository].forks , inline: true },
            { name: 'Watchers', value:Repos[repository].watchers_count , inline: true },
            
        )
    };
    msg.reply(RepoEmbed)

}