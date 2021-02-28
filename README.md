# TalkUpdater

This bot is designed to get voice activity data from a voice channel and pipe it to a webserver.
In practical terms this allows for a stream to add a browser source to show who is speaking.

Setup:

- run the init command (need permission to edit roles) only needs to be done once
- give the Pogerator role to anyone who you want to use the bot
- run the connect command while in a voice channel
- run the capture command to setup the output with all users in the voice channel

```none
>help - displays this message
>init - sets up permissions
>connect - connects bot to voice channel
>disconnect - disconnects bot from channel
>capture - updates connected users
>flip - flips the output
>refresh - refreshes the webpage (debugging)
>pog - pogs
```

You are free to use my code so long as the following message is included prominantly in the application:

---

Original Author: Ben Newman

Website: www.bnewman.dev

Email: dc@bnewman.dev

Github: www.github.com/jam1nb3n

Discord: jam1nb3n#1440

Designed for: www.twitch.tv/notbosch

---

Please enjoy and feel free to message me if you find any bugs

---

## Installation

---

- Install node and npm from https://nodejs.org/en/download/
- Install yarn by running >npm install --global yarn in terminal / powershell
- navigate to the following url and extract https://codeload.github.com/jam1nb3n/TalkUpdater/zip/master
- open the extracted folder in terminal / powershell
- create a file named ".env" in the extracted folder and add the following plain text

> BOT_TOKEN="[PUT YOUR BOT TOKEN HERE]"
>
> PORT="[PORT NUMBER]"

- run the following commands

> yarn install
>
> yarn start

- open http://localhost:PORT
- Enjoy!
