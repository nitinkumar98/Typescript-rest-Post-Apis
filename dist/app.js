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
const express_1 = __importDefault(require("express"));
const typescript_rest_1 = require("typescript-rest");
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./controllers/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_connector_1 = require("./mongoose.connector");
dotenv_1.default.config();
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
typescript_rest_1.Server.buildServices(app, ...index_1.default);
app.listen(8080, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Server listening on port 8080");
    mongoose_connector_1.MongooseConnector.mongoConnection();
}));
