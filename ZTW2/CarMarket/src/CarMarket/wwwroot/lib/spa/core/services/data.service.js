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
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.set = function (baseUri, pageSize) {
        this._baseUri = baseUri;
        this._pageSize = pageSize;
    };
    DataService.prototype.get = function (page) {
        var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();
        return this.http.get(uri)
            .map(function (response) { return response; });
    };
    DataService.prototype.getWithoutPages = function () {
        var uri = this._baseUri;
        return this.http.get(uri)
            .map(function (response) { return response; });
    };
    DataService.prototype.getById = function (id) {
        var uri = this._baseUri + id.toString();
        //debugger;
        return this.http.get(uri)
            .map(function (response) { return response; });
    };
    DataService.prototype.post = function (data, mapJson) {
        if (mapJson === void 0) { mapJson = true; }
        if (mapJson)
            return this.http.post(this._baseUri, data)
                .map(function (response) { return response.json(); });
        else
            return this.http.post(this._baseUri, data);
    };
    DataService.prototype.delete = function (id) {
        return this.http.delete(this._baseUri + id.toString())
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.update = function (offer, id) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put(this._baseUri, JSON.stringify(offer), {
            headers: headers
        })
            .map(function (response) { return response.json(); });
    };
    DataService.prototype.deleteResource = function (resource) {
        return this.http.delete(resource)
            .map(function (response) { return response.json(); });
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
