import { UserType } from "../models/UserModel";
import { MessageType } from "../models/MessageModel";
export declare abstract class UserServiceBase {
    abstract createNewUser(user: UserType): Promise<string>;
    abstract getUserByid(id: string): Promise<UserType>;
    abstract getAllUsers(): Promise<Array<UserType>>;
    abstract sendMessagesToUsers(id: string, message: MessageType): Promise<string>;
    abstract getAllMessagesOfUser(id: string): Promise<Array<MessageType>>;
}
