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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoutesController = void 0;
const typescript_rest_1 = require("typescript-rest");
const typescript_ioc_1 = require("typescript-ioc");
const PostIocServices_1 = require("../services/PostIocServices");
let PostRoutesController = class PostRoutesController {
    constructor(injectedService) {
        this.injectedService = injectedService;
    }
    createNewPost(post) {
        return this.injectedService.createNewPost(post);
    }
    getPostById(id) {
        return this.injectedService.getPostById(id);
    }
    getAllPosts() {
        return this.injectedService.getAllPosts();
    }
    updatePostById(id, postData) {
        return this.injectedService.updatePostById(id, postData);
    }
    deletePostById(id) {
        return this.injectedService.deletePostById(id);
    }
    toCommentsOnPost(id, commentData) {
        return this.injectedService.toCommentsOnPost(id, commentData);
    }
    toGetAllCommentsOnPost(id) {
        return this.injectedService.toGetAllCommentsOnPost(id);
    }
    toLikePost(id, user) {
        return this.injectedService.toLikePost(id, user);
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
    typescript_rest_1.Path("/posts"),
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [PostIocServices_1.PostServiceBase])
], PostRoutesController);
exports.PostRoutesController = PostRoutesController;
