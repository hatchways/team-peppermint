const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const stringHash = require("string-hash");
mongoose.Promise = global.Promise;
const uri = process.env.URI;
const UserSchema = require("../models/userSchema");
const ConversationSchema = require("../models/conversationSchema");
var User, Conversation;
module.exports = function () {
  return {
    connect: function () {
      return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });
        db.on("error", (err) => {
          reject(err);
        });
        db.once("open", () => {
          console.log("connected to db");
          User = db.model("users", UserSchema);
          Conversation = db.model(
            "conversations",
            ConversationSchema,
            "conversations"
          );
          resolve();
        });
      });
    },
    createUser: function (userObject) {
      return new Promise(async (resolve, reject) => {
        try {
          const salt = await bcrypt.genSalt(10);
          userObject.password = await bcrypt.hash(userObject.password, salt);
        } catch (err) {
          reject(err);
        }
        let newUser = new User(userObject);
        newUser.save((err) => {
          if (err) reject(err);
          else resolve(newUser);
        });
      });
    },
    getUserByEmail: function (userEmail) {
      return new Promise((resolve, reject) => {
        User.findOne({ email: userEmail })
          .exec()
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getUserById: function (userId) {
      return new Promise((resolve, reject) => {
        User.findOne({ _id: userId })
          .exec()
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getUsers: function (emails) {
      return new Promise((resolve, reject) => {
        User.find({
          email: { $in: emails },
        })
          .exec()
          .then((users) => {
            resolve(users);
          })
          .catch((err) => reject(err));
      });
    },
    deleteByEmail: function (userEmail) {
      return new Promise((resolve, reject) => {
        User.deleteOne({ email: userEmail })
          .exec()
          .then(() => {
            resolve(`user ${userEmail} successfully deleted`);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateUserFieldByEmail: function (userEmail, newData) {
      return new Promise((resolve, reject) => {
        User.updateOne(
          { email: userEmail },
          {
            $set: newData,
          }
        )
          .exec()
          .then(() => {
            resolve(`user ${userEmail} successfully updated`);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateUserImage: function (email, imageData) {
      return new Promise((resolve, reject) => {
        User.updateOne(
          {
            email: email,
          },
          {
            $set: {
              pictureURL: {
                url: imageData.url,
                name: imageData.name,
              },
            },
          }
        )
          .exec()
          .then(() => resolve("image updated"))
          .catch((err) => reject(err));
      });
    },
    getConversations: function (userEmail) {
      return new Promise(async (resolve, reject) => {
        try {
          let user = await this.getUserByEmail(userEmail);
          let chatsIds = [];
          user.groupChats.forEach((chat) => {
            chatsIds.push(chat);
          })
          user.contacts.forEach((contact) => {
            chatsIds.push(contact.conversationID)
          })
          Conversation.find({
            conversationID: { $in: chatsIds }
          }).exec()
            .then((conversations) => {
              resolve(conversations.reduce((filtered, convo) => {
                  filtered.push({
                    users: convo.users,
                    conversationID: convo.conversationID,
                    lastMessage: convo.messages.length > 0 ? convo.messages[convo.messages.length - 1] : undefined,
                    messageCount: convo.messages.length
                  })
                return filtered;
              },[]))
            })

        }
        catch (err) {
          reject(err);
        }
      });
    },
    getContacts: function (userEmail) {
      return new Promise((resolve, reject) => {
        this.getUserByEmail(userEmail)
          .then((user) => {
            resolve(user.contacts);
          })
          .catch((err) => reject(err));
      });
    },
    addContactToEmail: function (currentEmail, emailToAdd, status) {
      let conversationID = [currentEmail, emailToAdd].sort().join();
      return new Promise((resolve, reject) => {
        User.updateOne(
          {
            email: currentEmail,
            'contacts.email': { $ne: emailToAdd }
          },
          {
            $push: {
              contacts: {
                email: emailToAdd,
                status: status,
                conversationID: stringHash(conversationID),
              },
            },
          }
        ).exec()
          .then(() => resolve(`Contact ${emailToAdd} added to ${currentEmail} with status ${status}`))
          .catch((err) => reject(err))
      })
    },
    addContact: function (currentEmail, emailToAdd) {
      return new Promise((resolve, reject) => {
        Promise.all([
          this.addContactToEmail(currentEmail, emailToAdd, 3),
          this.addContactToEmail(emailToAdd, currentEmail, 0)
        ])
          .then((results) => {
            console.log(results)
            resolve(`${emailToAdd} contact added to ${currentEmail}`);
          })
          .catch((error) => {
            console.log("Error addContact:", error)
            reject(error);
          })

      });
    },
    deleteContact: function (email, contactToDelete) {
      return new Promise((resolve, reject) => {
        User.updateOne(
          {
            email: email,
          },
          {
            $pull: { contacts: { email: contactToDelete } },
          }
        )
          .exec()
          .then((msg) =>
            resolve(`contact ${contactToDelete} removed from contacts`)
          )
          .catch((err) => reject(err));
      });
    },
    updateContact: function (email, contactEmail, status, conversationID) {
      let updateBlock = {};

      if (status)
        updateBlock["contacts.$.status"] = status;
      if (conversationID)
        updateBlock["contacts.$.conversationID"] = conversationID;
      return new Promise((resolve, reject) => {
        User.updateOne(
          {
            email: email,
            "contacts.email": contactEmail,
          },
          {
            $set: updateBlock
          }
        )
          .exec()
          .then(() => resolve(`${contactEmail}'s status changed`))
          .catch((err) => reject(err));
      });
    },
    updateContactConversationID: function (email, contactEmail, conversationID) {
      return new Promise((resolve, reject) => {
        User.updateOne(
          {
            email: email,
            "contacts.email": contactEmail,
          },
          {
            $set: {
              "contacts.$.conversationID": conversationID,
            },
          }
        )
          .exec()
          .then(() => resolve(`${contactEmail}'s status changed`))
          .catch((err) => reject(err));
      });
    },
    getContactsByStatus: function (email, status) {
      return new Promise((resolve, reject) => {
        this.getUserByEmail(email)
          .then((user) => {
            if (user.contacts.length > 0) {
              resolve(
                user.contacts.filter((contact) => contact.status === status)
              );
            } else {
              resolve([]);
            }
          })
          .catch((err) => reject(err));
      });
    },
    getInvitationByContactEmail: function (email, contactEmail, status) {
      return new Promise((resolve, reject) => {
        this.getUserByEmail(email)
          .then((user) => {
            if (user.contacts.length > 0) {
              resolve(
                user.contacts.find(
                  (contact) =>
                    contact.email === contactEmail && contact.status === status
                )
              );
            } else {
              resolve({});
            }
          })
          .catch((err) => reject(err));
      });
    },
    getConversationById: function (convID) {
      return new Promise((resolve, reject) => {
        Conversation.findOne({ conversationID: convID })
          .exec()
          .then((conversation) => resolve(conversation))
          .catch((err) => reject(err));
      });
    },
    createConversation: async function (users) {
      let conversationObject = {
        conversationID: stringHash(users.sort().join()),
        users: users
      }
      return new Promise((resolve, reject) => {
        let newConversation = new Conversation(conversationObject);
        newConversation.save((err) => {
          if (err) reject(err);
          else resolve("New conversation created");
        });
      });
    },
    addMessage: function (conversationID, message) {
      return new Promise((resolve, reject) => {
        Conversation.updateOne(
          { conversationID: conversationID },
          { $push: { messages: message } }
        )
          .then(() => resolve("message added"))
          .catch((err) => reject(err));
      });
    },
    addGroupChat: function (users) {
      console.log(users)
      let conversationID = stringHash(users.sort().join())
      return new Promise((resolve, reject) => {
        User.updateMany(
          {
            email: { $in: users }
          },
          {
            $addToSet: {
              groupChats: conversationID
            }
          }).then(() => resolve("added to users"))
          .catch((err) => reject(err))
      })
    },
  };
};
