import { Path, GET, PathParam, POST, PATCH } from "typescript-rest";
import { Inject } from "typescript-ioc";

import { UserType } from "../models/UserModel";
import { MessageType } from "../models/MessageModel";
import { UserServiceBase } from "../services/index";

@Path("/users")
export class UserRoutesController {
  @Inject
  private injectedService: UserServiceBase;

  @POST
  private createNewUser(user: UserType): Object {
    return this.injectedService.createNewUser(user);
  }

  @GET
  @Path(":id")
  private getUserByid(@PathParam("id") id: string): Promise<Object> {
    return this.injectedService.getUserByid(id);
  }

  @GET
  private getAllUsers(): Promise<Object> {
    return this.injectedService.getAllUsers();
  }

  @PATCH
  @Path(":id/messages")
  private sendMessagesToUsers(
    @PathParam("id") id: string,
    message: MessageType
  ): Object {
    return this.injectedService.sendMessagesToUsers(id, message);
  }

  @GET
  @Path(":id/messages")
  private getAllMessagesOfUser(@PathParam("id") id: string): Promise<Object> {
    return this.injectedService.getAllMessagesOfUser(id);
  }
}
