"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    name: String,
    image: String,
    description: String,
    postedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    likes: { type: Number, default: 0 },
    likes_by: [{ userId: { type: mongoose_1.default.Schema.Types.ObjectId } }],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Post", postSchema);
