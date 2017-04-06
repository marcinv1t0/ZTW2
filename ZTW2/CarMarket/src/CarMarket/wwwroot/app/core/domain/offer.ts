export class Offer {
    Id: number;
    UserID: number;
    Model: string;
    Year: number;
    Mileage: number;
    Description: string;
    Price: number;
    Color: string;
    Fuel: string;
    Category: string;
    SeatsNb: number;
    DoorsNb: number;
    Displacement: number;
    Gearbox: string;
    Drive: string;
    Damaged: boolean;
    ABS: boolean;
    Airbags: boolean;
    CentralLock: boolean;
    AirCond: boolean;
    StartTime: Date;
    EndTime: Date;
    Status: string;
    Make: string;

    constructor(id: number,
        userID: number,
        model: string,
        year: number,
        mileage: number,
        description: string,
        price: number,
        color: string,
        fuel: string,
        category: string,
        seatsNb: number,
        doorsNb: number,
        displacement: number,
        gearbox: string,
        drive: string,
        damaged: boolean,
        abs: boolean,
        airbags: boolean,
        centrallock: boolean,
        aircond: boolean,
        starttime: Date,
        endtime: Date,
        status: string,
        make: string) {
        this.Id = id;
        this.UserID = userID;
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
    }



}