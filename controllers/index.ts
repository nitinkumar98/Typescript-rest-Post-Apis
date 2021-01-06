import { UserRoutesController } from "./UsersRoutes";
import { PostRoutesController } from "./PostsRoutes";
import { PostServiceBaseImp } from "../services/PostIocServices";
import { UserServiceBaseImp } from "../services/UserIocService";

const user = new UserServiceBaseImp();
const post = new PostServiceBaseImp();
new UserRoutesController(user);
new PostRoutesController(post);

export default [UserRoutesController, PostRoutesController];
