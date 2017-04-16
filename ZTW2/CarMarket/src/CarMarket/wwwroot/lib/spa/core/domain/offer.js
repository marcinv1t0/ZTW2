"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Offer = (function () {
    function Offer(//id: number,
        username, model, year, mileage, description, price, color, fuel, category, seatsNb, doorsNb, displacement, gearbox, drive, damaged, abs, airbags, centrallock, aircond, starttime, endtime, status, make, photouri) {
        //this.Id = id;
        this.Username = username;
        this.Model = model;
        this.Year = year;
        this.Mileage = mileage;
        this.Description = description;
        this.Price = price;
        this.Color = color;
        this.Fuel = fuel;
        this.Category = category;
        this.SeatsNb = seatsNb;
        this.DoorsNb = doorsNb;
        this.Displacement = displacement;
        this.Gearbox = gearbox;
        this.Drive = drive;
        this.Damaged = damaged;
        this.ABS = abs;
        this.Airbags = airbags;
        this.CentralLock = centrallock;
        this.AirCond = aircond;
        this.StartTime = starttime;
        this.EndTime = endtime;
        this.Status = status;
        this.Make = make;
        this.PhotoUri = photouri;
    }
    return Offer;
}());
exports.Offer = Offer;
