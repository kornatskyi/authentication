"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const expirationDate_1 = __importDefault(require("../utils/expirationDate"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
// expected body = {email: string, password: string}
const signIn = (req, res, next) => {
    // Validate request, check if all required fields exist
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400);
        next(new Error("Empty credentials"));
        return;
    }
    const [email, password] = [req.body.email, req.body.password];
    //set cookie expiression date
    req.session.cookie.expires = (0, expirationDate_1.default)(100);
    //Search for user with the provided email address in the database
    user_model_1.default.findByEmail(email, (err, result) => {
        //Handle database errors
        if (err) {
            if (err.kind === "not_found") {
                res.status(404);
                next(new Error(`Not found User with ${email} email`));
            }
            else {
                res.status(500);
                next(new Error(`Error retrieving User with ${email} email`));
            }
            //check password
        }
        else if (!bcryptjs_1.default.compareSync(password, result.password)) {
            res.status(401);
            next(new Error("Incorrect password!!!"));
        }
        else {
            //If user authorized successfully create new session with his credentials
            req.session.user = new user_model_1.default(result.email, result.name, result.password);
            res.status(200).send("User " + result.name + " is authorized!");
        }
    });
};
exports.signIn = signIn;
// expected body = {email: string, name: string password: string}
const signUp = (req, res, next) => {
    // Validate request, check if all required fields exist
    if (!req.body || !req.body.email || !req.body.password || !req.body.name) {
        res.status(400).send("Empty credentials");
    }
    //Encrypt user password to store in database
    const hash = bcryptjs_1.default.hashSync(req.body.password, 14);
    req.body.password = hash;
    // Create a User object
    const user = new user_model_1.default(req.body.email, req.body.name, req.body.password);
    // Create new user in the database
    user_model_1.default.create(user, (err, data) => {
        if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.status(500);
                next(new Error("User with this email exists"));
            }
            else {
                res.status(500);
                next(new Error("Some error occurred while creating the User"));
            }
        }
        else {
            //Send confirmation link to provided email address
            (0, sendEmail_1.default)(user)
                .then(() => {
                res.status(201);
                res.send("We sent you a mail with instructions on how to confirm your email address. It can take some time for a mail to come.");
            })
                .catch(() => {
                res
                    .status(200)
                    .send("User was created but can't send confirmation link to the given email.");
            });
        }
    });
};
exports.signUp = signUp;
