import { UserServiceBase } from "../services/UserIocService";
export declare class UserRoutesController {
    private injectedService;
    constructor(injectedService: UserServiceBase);
    private createNewUser;
    private getUserByid;
    private getAllUsers;
    private sendMessagesToUsers;
    private getAllMessagesOfUser;
}
