# Peppermint chat app

The app designed to exchange messages between two people who speak completely different languages. Think: FB Messenger with a built-in automatic translator. If we could more easily speak to others from around the world, we would be a more inclusive and connected world!

## Synopsis

There are two main users:
1. The sender:
a. The sender sends messages in his/her chosen language
2. The receiver
a. The receiver receives messages in his/her chosen language
For example: Sender speaks English and Receiver speaks Chinese. The Sender sends “what is your schedule for today?: and the receiver receives that message in Chinese. The receiver can then send Chinese back “I have 3 meetings and a dinner”, and the sender will receive this message back in English.

User can login/signup with email address. User can email invitation or referral link to sign up. When signing up the user can select primary language. User can accept friend request, search contacts by email or name. User can also join group chat.

## Downloading the project

Fork and clone this repo.

## Running the project localy

### The back-end server

```sh
cd server
npm install
npm run start
```
### The front-end server

```sh
cd client
npm install
npm run start
```

## Screenshot of Peppermint chat app in action

### Login/Signup Page

!["Login/Signup Page"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/signup-page.png?raw=true)

### Chats list

!["Chats list"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/chats.png?raw=true)

### Contacts list

!["Contacts list"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/contacts.png?raw=true)

### Invitation window

!["Invitation window"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/invitation-window.png?raw=true)

### User avatar replacing

!["User avatar replacing"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/user-image-replace-window.png?raw=true)

### Image upload window to send to another user

!["Image upload window to send to another user"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/upload-window.png?raw=true)

### Mobile friendly design

!["Mobile friendly design"](https://github.com/hatchways/team-peppermint/blob/add-readme/client/public/images/mobile-friendly-design.png?raw=true)

## Dependencies

- react 16.13.1,
- material-ui,
- firebase,
- socket.io,
- material-ui-gropzone,
- emoji-mart,
- jwt-decode,
- validator,
- parse-url,
- core-js,
- bcrypt,
- sendgrid/email,
- mongodb,
- mongoose,
- jsonwebtoken,
- mailgen