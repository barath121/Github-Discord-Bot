const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv')
const https = require('https');
const ReplyController = require('./Controller/DiscordReplyController')
dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  const messageSplitted = msg.content.split(" ")

  if (messageSplitted[0] === '!git') {
    if(messageSplitted[1] === 'user')
      MakeRequest('user','/users/'+messageSplitted[2],msg,messageSplitted[2])
    if(messageSplitted[1] === 'repos')  
    MakeRequest('repos','/users/'+messageSplitted[2]+'/repos',msg,messageSplitted[2],messageSplitted[3]?parseInt(messageSplitted[3]):1)
  }
});

client.login(process.env.Token);
const MakeRequest = (request,path,msg,user,page)=>{
const options = {
  host: 'api.github.com',
  path: path,
  headers: {
    "User-Agent" : "Disc"
  }
}
https.get(options, (resp) => {
  let data = '';
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
    if(request=='user')
    ReplyController.UserDetails(JSON.parse(data),msg)
    if(request=='repos'){
      let repos = JSON.parse(data)
      console.log(page<Math.ceil(Object.keys(repos).length/3)?page:Math.ceil(Object.keys(repos).length/3))
    ReplyController.UserRepos(repos,user,msg,page<Math.ceil(Object.keys(repos).length/3)?page:Math.ceil(Object.keys(repos).length/3))
  }
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}