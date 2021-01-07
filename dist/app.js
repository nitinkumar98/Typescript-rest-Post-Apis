"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typescript_rest_1 = require("typescript-rest");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./controllers/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const url = "mongodb://localhost/tposts";
let app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: true }));
typescript_rest_1.Server.buildServices(app, ...index_1.default);
app.listen(8080, () => {
    console.log("Server listening on port 8080");
    try {
        mongoose_1.default.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("Database connected");
    }
    catch (error) {
        console.log(error);
    }
});
