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
exports.UserServiceBaseImp = exports.UserServiceBase = void 0;
const typescript_ioc_1 = require("typescript-ioc");
const mongoose_1 = __importDefault(require("mongoose"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const MessageModel_1 = __importDefault(require("../models/MessageModel"));
class UserServiceBase {
}
exports.UserServiceBase = UserServiceBase;
class UserServiceBaseImp {
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
}
exports.UserServiceBaseImp = UserServiceBaseImp;
typescript_ioc_1.Container.bind(UserServiceBase).to(UserServiceBaseImp);
