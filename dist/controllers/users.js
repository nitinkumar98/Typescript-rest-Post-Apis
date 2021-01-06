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
exports.UserRoutesClass = void 0;
const typescript_rest_1 = require("typescript-rest");
const user_1 = __importDefault(require("../models/user"));
const message_1 = __importDefault(require("../models/message"));
const mongoose_1 = __importDefault(require("mongoose"));
let UserRoutesClass = class UserRoutesClass {
    createNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_1.default.create(user);
            return "User created";
        });
    }
    getUserByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.findById(id);
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.default.find({});
        });
    }
    sendMessagesToUsers(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            message.sendBy = id;
            //const tempId: string = id + message.receiveBy;
            message.roomId = (id + message.receiveBy).split("").sort().join("");
            //message.roomId = [message.receiveBy, message.sendBy].sort().join("");
            yield message_1.default.create(message);
            return "Message send successfully!";
        });
    }
    getAllMessagesOfUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield message_1.default.aggregate([
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
        });
    }
};
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserRoutesClass.prototype, "createNewUser", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutesClass.prototype, "getUserByid", null);
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserRoutesClass.prototype, "getAllUsers", null);
__decorate([
    typescript_rest_1.PATCH,
    typescript_rest_1.Path(":id/messages"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserRoutesClass.prototype, "sendMessagesToUsers", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id/messages"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRoutesClass.prototype, "getAllMessagesOfUser", null);
UserRoutesClass = __decorate([
    typescript_rest_1.Path("/users")
], UserRoutesClass);
exports.UserRoutesClass = UserRoutesClass;
