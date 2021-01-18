import { Path, GET, PathParam, POST, PATCH } from 'typescript-rest';
import { Inject } from 'typescript-ioc';

import { UserType, MessageType } from '../models';
import { UserServiceBase } from '../services';

/**
 * operations implemented for user
 */
@Path('/users')
export class UserRoutesController {
  //property injection
  @Inject
  private injectedService: UserServiceBase;

  /**
   * create a new users
   * @param user The new user data
   */
  @POST
  private createNewUser(user: UserType): Promise<Object> {
    return this.injectedService.createNewUser(user);
  }

  /**
   * find the user for given id
   * @param id id to search for user from mongodb
   */
  @GET
  @Path(':id')
  private getUserByid(@PathParam('id') id: string): Promise<Object> {
    return this.injectedService.getUserByid(id);
  }

  /**
   * get all users
   */
  @GET
  private getAllUsers(): Promise<Object> {
    return this.injectedService.getAllUsers();
  }

  /**
   * send messages to users
   * @param id message sender user_id
   * @param message text message to send
   */
  @PATCH
  @Path(':id/messages')
  private sendMessagesToUsers(
    @PathParam('id') id: string,
    message: MessageType
  ): Object {
    return this.injectedService.sendMessagesToUsers(id, message);
  }

  /**
   * find last sending or receiving messages from all users
   * @param id to find the user
   */
  @GET
  @Path(':id/messages')
  private getAllMessagesOfUser(@PathParam('id') id: string): Promise<Object> {
    return this.injectedService.getAllMessagesOfUser(id);
  }
}
