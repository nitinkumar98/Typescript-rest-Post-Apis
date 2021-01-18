import { UserType, MessageType } from '../../models';

export abstract class UserServiceBase {
  public abstract createNewUser(user: UserType): Promise<Object>;
  public abstract getUserByid(id: string): Promise<UserType>;
  public abstract getAllUsers(): Promise<Array<UserType>>;
  public abstract sendMessagesToUsers(
    id: string,
    message: MessageType
  ): Promise<Object>;
  public abstract getAllMessagesOfUser(id: string): Promise<Array<MessageType>>;
}
