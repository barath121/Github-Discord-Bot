# Github-Discord-Bot
Github Discord Bot is Discord Bot build on Node Js and Discord JS which shows github user details in Discord and Sharing Personal Resume.
## Libraries Used
- Discord JS
- https
- mongoose
## Sample Images
## User Details
![me](/images/me.PNG)
## Installation
- Install all the packages using
``` npm install ```
- Add The Environment Variables by running 
``` cp .envexample .env```
- Add the Discord Bot Token and Database Credentials in the .env file
## List of Commands
### Get User Details Commands
- ```!git user {username}``` : Displays details of the Username provided
- ```!git repos {username} {page}``` : Displays List of User's public repos
- ```!git following {username} {page}``` : Displays List of User's following 
- ```!git followers {username} {page}``` : Displays List of Users's followers
### Create Custom Card for user
- ```!git me {username}``` : Add your github username
- ```!git me {resume}``` : Add your resume link
- ```!git me {repo}``` : Add a repo to show on your card
- ```!git me``` : Show your Card
## TODO
- [x] Added User Details
- [x] Added User Repositories Details
- [x] Added Custom Card
- [ ] Make a Bot Commands Website
