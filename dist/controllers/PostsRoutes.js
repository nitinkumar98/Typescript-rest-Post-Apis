"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PostRoutesController = void 0;
const PostModel_1 = __importDefault(require("../models/PostModel"));
const typescript_rest_1 = require("typescript-rest");
const CommentModel_1 = __importDefault(require("../models/CommentModel"));
let PostRoutesController = class PostRoutesController {
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
};
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "createNewPost", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "getPostById", null);
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "getAllPosts", null);
__decorate([
    typescript_rest_1.PATCH,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "updatePostById", null);
__decorate([
    typescript_rest_1.DELETE,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "deletePostById", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path(":id/comments"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "toCommentsOnPost", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id/comments"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "toGetAllCommentsOnPost", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path(":id/likes"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostRoutesController.prototype, "toLikePost", null);
PostRoutesController = __decorate([
    typescript_rest_1.Path("/posts")
], PostRoutesController);
exports.PostRoutesController = PostRoutesController;
