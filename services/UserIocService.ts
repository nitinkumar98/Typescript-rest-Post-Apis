import { Container } from 'typescript-ioc';
import mongoose from 'mongoose';

import { User, UserType, Message, MessageType } from '../models';
import { UserServiceBase } from './interfaces';

/**
 * implementation of all user operations
 */

export class UserServiceBaseImp implements UserServiceBase {
  /**
   * create new user
   * @returns Promise of object
   */
  public async createNewUser(user: UserType): Promise<Object> {
    try {
      await User.create(user);
      return { message: 'User created' };
    } catch (error) {
      return error;
    }
  }

  /**
   * get user by id
   * @returns Promise of user model
   */
  public async getUserByid(id: string): Promise<UserType> {
    try {
      return await User.findById(id);
    } catch (error) {
      return error;
    }
  }

  /**
   * get all user
   * @returns Promise of array of user model
   */
  public async getAllUsers(): Promise<Array<UserType>> {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  }

  /**
   * send message to different users
   * @returns Promise of object
   */
  public async sendMessagesToUsers(
    id: string,
    message: MessageType
  ): Promise<Object> {
    try {
      message.sendBy = id;
      message.roomId = (id + message.receiveBy).split('').sort().join('');

      await Message.create(message);
      return { message: 'Message send successfully!' };
    } catch (error) {
      return error;
    }
  }

  /**
   * get all messages of a user(Only the last sending or receiving messages from all the users)
   * @returns Promise of array of message model
   */
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
            _id: '$roomId',
            text: { $first: '$text' },
            sendBy: { $first: '$sendBy' },
            receiveBy: { $first: '$receiveBy' },
            createdAt: { $first: '$createdAt' },
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
