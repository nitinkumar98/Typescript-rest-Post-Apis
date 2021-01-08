"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoutesController_1 = require("./UserRoutesController");
const PostRoutesController_1 = require("./PostRoutesController");
const AwsS3Controller_1 = require("./AwsS3Controller");
exports.default = [UserRoutesController_1.UserRoutesController, PostRoutesController_1.PostRoutesController, AwsS3Controller_1.AwsS3Controller];