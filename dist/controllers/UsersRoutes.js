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
exports.UserRoutesController = void 0;
const typescript_rest_1 = require("typescript-rest");
const typescript_ioc_1 = require("typescript-ioc");
const UserIocService_1 = require("../services/UserIocService");
let UserRoutesController = class UserRoutesController {
    constructor(injectedService) {
        this.injectedService = injectedService;
    }
    createNewUser(user) {
        return this.injectedService.createNewUser(user);
    }
    getUserByid(id) {
        return this.injectedService.getUserByid(id);
    }
    getAllUsers() {
        return this.injectedService.getAllUsers();
    }
    sendMessagesToUsers(id, message) {
        return this.injectedService.sendMessagesToUsers(id, message);
    }
    getAllMessagesOfUser(id) {
        return this.injectedService.getAllMessagesOfUser(id);
    }
};
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserRoutesController.prototype, "createNewUser", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutesController.prototype, "getUserByid", null);
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserRoutesController.prototype, "getAllUsers", null);
__decorate([
    typescript_rest_1.PATCH,
    typescript_rest_1.Path(":id/messages"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRoutesController.prototype, "sendMessagesToUsers", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id/messages"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutesController.prototype, "getAllMessagesOfUser", null);
UserRoutesController = __decorate([
    typescript_rest_1.Path("/users"),
    __param(0, typescript_ioc_1.Inject),
    __metadata("design:paramtypes", [UserIocService_1.UserServiceBase])
], UserRoutesController);
exports.UserRoutesController = UserRoutesController;
