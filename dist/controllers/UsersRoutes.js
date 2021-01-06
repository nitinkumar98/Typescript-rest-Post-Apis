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
exports.UserRoutesController = void 0;
const typescript_rest_1 = require("typescript-rest");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
const mongoose_1 = __importDefault(require("mongoose"));
let UserRoutesController = class UserRoutesController {
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserModel_1.default.create(user);
                return "User created";
            }
            catch (error) {
                return error;
            }
        });
    }
    getUserByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.findById(id);
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserModel_1.default.find({});
            }
            catch (error) {
                return error;
            }
        });
    }
    sendMessagesToUsers(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                message.sendBy = id;
                message.roomId = (id + message.receiveBy).split("").sort().join("");
                //message.roomId = [message.receiveBy, message.sendBy].sort().join("");
                yield MessageModel_1.default.create(message);
                return "Message send successfully!";
            }
            catch (error) {
                return error;
            }
        });
    }
    getAllMessagesOfUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield MessageModel_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { sendBy: mongoose_1.default.Types.ObjectId(id) },
                                { receiveBy: mongoose_1.default.Types.ObjectId(id) },
                            ],
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            text: 1,
                            sendBy: 1,
                            receiveBy: 1,
                            createdAt: 1,
                            roomId: 1,
                        },
                    },
                    { $sort: { createdAt: -1 } },
                    {
                        $group: {
                            _id: "$roomId",
                            text: { $first: "$text" },
                            sendBy: { $first: "$sendBy" },
                            receiveBy: { $first: "$receiveBy" },
                            createdAt: { $first: "$createdAt" },
                        },
                    },
                    { $sort: { createdAt: -1 } },
                ]);
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
    typescript_rest_1.Path("/users")
], UserRoutesController);
exports.UserRoutesController = UserRoutesController;
