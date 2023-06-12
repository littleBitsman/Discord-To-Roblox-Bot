# Discord-to-Roblox Moderation Bot
this is currently broken, I will make a video after it's fixed.
## Instructions for Installation (or, watch the video when it's out):
*note: this tutorial assumes that if you are using a PC for setup and not Glitch you are on a Windows PC. this especially influences step 17*
1. Download the latest release as a ZIP file.
2. Extract it to a folder. In this guide, it will be referred to as "the folder".
3. Open `config.json`.
4. Go to https://discord.com/developers. _Skip 4-6 if you have an existing application with a bot account._
5. Create an application. 
6. Create a bot account under "Bot".
7. Copy your token. **_WARNING: THIS TOKEN IS VERY SENSITIVE. IF STOLEN, MALICIOUS PEOPLE CAN USE IT TO IMPERSONATE YOUR BOT, POTENTIALLY GETTING IT DELETED. KEEP THIS PRIVATE!!!!_**
8. Go back to `config.json` and set the `"token"` value to the token you copied. Make sure it is wrapped in quotation marks (for example, `"token": "h8wa7y67sagd657w6dwad"` <-- this isn't a real token).
9. Go to https://create.roblox.com/credentials and press "Create API Key".
10. Under "Access Permissions", select "Messaging Service API" and then press "Add API System"
11. Add the desired experience that you want to link to the Discord bot. You have to have created it. 
    - Once you have selected the experience, hit "Add Experience"
    - Then, under "Experience Operations", select "Publish".
12. Enter the IP addresses that you want to allow to use this API key. I recommend using Glitch and uploading the files there.
    - If you are using Glitch, go to your project's terminal and run `curl https://ifconfig.me`. Don't worry, it only exposes the project's IP address. Copy and use this IP address in the IP addresses you want to allow on the API key.
13. Create the API key with your choice of expiration date and copy it. **_WARNING: THIS TOKEN IS ALSO VERY SENSITIVE AND THOSE WITH MALICIOUS INTENT CAN SEND NSFW CONTENT TO GAME SERVERS, POSSIBLY GETTING YOUR GAME BANNED FROM ROBLOX. KEEP THIS PRIVATE!!!!_**
14. Go back to `config.json` and set the `robloxAPIKey` field to the copied API key.
15. Invite your bot to the desired guild/Discord server using the OAuth2 URI generator in the Discord Developer Dashboard (in the Application > OAuth2). Make sure you set the scopes to `bot` and `application.commands`. 
16. Enable developer mode in the Discord app and copy the guild/server ID and set the `guildId` field in `config.json` to the guild ID.
17. _This step varies if you are on Glitch or on a PC._
    - If you are on Glitch, do the following: 
        - Literally wait for the server to start having an output. There should be a rather large object in console that looks like this: 
        ```
        '1014652224237994027' => <ref *1> ApplicationCommand {
            id: '1014652224237994027',
            applicationId: '1001498584476287076',
            guild: Guild {
                id: '776094501353160735',
                name: 'Your Server',
                icon: '35a647be0c7429754008970168d1dd9d',
                features: [Array],
                commands: [GuildApplicationCommandManager],
                members: [GuildMemberManager],
                channels: [GuildChannelManager],
                bans: [GuildBanManager],
                roles: [RoleManager],
                presences: PresenceManager {},
                voiceStates: [VoiceStateManager],
                stageInstances: [StageInstanceManager],
                invites: [GuildInviteManager],
                scheduledEvents: [GuildScheduledEventManager],
                available: true,
                shardId: 0,
                splash: null,
                banner: null,
                description: null,
                verificationLevel: 3,
                vanityURLCode: null,
                nsfwLevel: 0,
                premiumSubscriptionCount: 2,
                discoverySplash: null,
                memberCount: 250,
                large: true,
                premiumProgressBarEnabled: true,
                applicationId: null,
                afkTimeout: 300,
                afkChannelId: null,
                systemChannelId: '867433635401039882',
                premiumTier: 1,
                widgetEnabled: null,
                widgetChannelId: null,
                explicitContentFilter: 2,
                mfaLevel: 0,
                joinedTimestamp: 1661982325549,
                defaultMessageNotifications: 1,
                systemChannelFlags: [SystemChannelFlagsBitField],
                maximumMembers: 500000,
                maximumPresences: null,
                maxVideoChannelUsers: 25,
                approximateMemberCount: null,
                approximatePresenceCount: null,
                vanityURLUses: null,
                rulesChannelId: '867434090520117279',
                publicUpdatesChannelId: '977526280285225041',
                preferredLocale: 'en-US',
                ownerId: '993715743055163515',
                emojis: [GuildEmojiManager],
                stickers: [GuildStickerManager]
            },
            guildId: '776094501353160735',
            permissions: ApplicationCommandPermissionsManager {
                manager: [Circular *4],
                guild: [Guild],
                guildId: '776094501353160735',
                  commandId: '1014652224237994027'
            },
            type: 1,
            name: 'dtr',
            nameLocalizations: null,
            nameLocalized: null,
            description: 'Execute a Discord-to-Roblox moderation action.',
            descriptionLocalizations: null,
            descriptionLocalized: null,
            options: [ [Object], [Object], [Object], [Object], [Object] ],
            defaultMemberPermissions: null,
            dmPermission: null,
            version: '1017519180637011988'
        }
        ```
        - If you see this, continue to the next step.
    - If you are on a PC, local computer, or virtual machine:
        - Go into the folder and create a file named "start.txt"
        - Open the file and type 
            ```
            npm i 
            node .
            ```
        - Close the file and rename it `start.bat`.
        - Double click the file to run it. 
        - If you see a command prompt open with the same output as seen in the Glitch steps, then continue to the next step.
18. Use the `DiscordToRobloxLuaScript.rbxm` file that you downloaded in the folder and insert it into your Roblox place inside `ServerScriptService`. Make sure the script is not disabled.

## Having issues? Make an issue in the Issues tab.
## Didn't solve your issues? Contact littleBitsman#4576 on Discord for more help.
