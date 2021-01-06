import { Container } from "typescript-ioc";
import mongoose from "mongoose";
import User, { UserType } from "../models/UserModel";
import Message, { MessageType } from "../models/MessageModel";

export abstract class UserServiceBase {
  public abstract createNewUser(user: UserType): Promise<string>;
  public abstract getUserByid(id: string): Promise<UserType>;
  public abstract getAllUsers(): Promise<Array<UserType>>;
  public abstract sendMessagesToUsers(
    id: string,
    message: MessageType
  ): Promise<string>;
  public abstract getAllMessagesOfUser(id: string): Promise<Array<MessageType>>;
}

export class UserServiceBaseImp implements UserServiceBase {
  public async createNewUser(user: UserType): Promise<string> {
    try {
      await User.create(user);
      return "User created";
    } catch (error) {
      return error;
    }
  }

  public async getUserByid(id: string): Promise<UserType> {
    try {
      return await User.findById(id);
    } catch (error) {
      return error;
    }
  }

  public async getAllUsers(): Promise<Array<UserType>> {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  }

  public async sendMessagesToUsers(
    id: string,
    message: MessageType
  ): Promise<string> {
    try {
      message.sendBy = id;
      message.roomId = (id + message.receiveBy).split("").sort().join("");
      //message.roomId = [message.receiveBy, message.sendBy].sort().join("");
      await Message.create(message);
      return "Message send successfully!";
    } catch (error) {
      return error;
    }
  }

  public async getAllMessagesOfUser(id: string): Promise<Array<MessageType>> {
    try {
      return await Message.aggregate([
        {
          $match: {
            $or: [
              { sendBy: mongoose.Types.ObjectId(id) },
              { receiveBy: mongoose.Types.ObjectId(id) },
            ],
          },
        },
        {
          $project: {
            _id: 0,
            text: 1,
            sendBy: 1,
            receiveBy: 1,
            createdAt: 1,
            roomId: 1,
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$roomId",
            text: { $first: "$text" },
            sendBy: { $first: "$sendBy" },
            receiveBy: { $first: "$receiveBy" },
            createdAt: { $first: "$createdAt" },
          },
        },
        { $sort: { createdAt: -1 } },
      ]);
    } catch (error) {
      return error;
    }
  }
}
Container.bind(UserServiceBase).to(UserServiceBaseImp);
