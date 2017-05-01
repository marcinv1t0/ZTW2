"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(Id, username, role, password) {
        this.Id = Id;
        this.Username = username;
        this.Role = role;
        this.Password = password;
        this.RememberMe = false;
    }
    return User;
}());
exports.User = User;
