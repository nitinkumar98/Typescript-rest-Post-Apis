"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostServiceBase = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const PostModel_1 = __importDefault(require("../models/PostModel"));
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
class PostServiceBase {
}
exports.PostServiceBase = PostServiceBase;
class PostServiceBaseImp {
    createNewPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PostModel_1.default.create(post);
                return "Post created";
            }
            catch (error) {
                return error;
            }
        });
    }
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PostModel_1.default.findById(id);
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield PostModel_1.default.find({});
            }
            catch (error) {
                return error;
            }
        });
    }
    updatePostById(id, postData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PostModel_1.default.findByIdAndUpdate(id, postData);
                return "post updated";
            }
            catch (error) {
                return error;
            }
        });
    }
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield PostModel_1.default.findByIdAndDelete(id);
                return "Post deleted successfully!";
            }
            catch (error) {
                return error;
            }
        });
    }
    toCommentsOnPost(id, commentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                commentData.onPost = id;
                yield CommentModel_1.default.create(commentData);
                return "Comment created successfully!!";
            }
            catch (error) {
                return error;
            }
        });
    }
    toGetAllCommentsOnPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CommentModel_1.default.find({ onPost: id }).populate("commentedBy");
            }
            catch (error) {
                return error;
            }
        });
    }
    toLikePost(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = user.likedBy;
                yield PostModel_1.default.findByIdAndUpdate(id, {
                    $inc: { likes: 1 },
                    $push: {
                        likes_by: {
                            $each: [
                                {
                                    userId,
                                },
                            ],
                            $position: 0,
                        },
                    },
                }, { new: true });
                return "Someone liked the post";
            }
            catch (error) {
                return error;
            }
        });
    }
}
typescript_ioc_1.Container.bind(PostServiceBase).to(PostServiceBaseImp);
