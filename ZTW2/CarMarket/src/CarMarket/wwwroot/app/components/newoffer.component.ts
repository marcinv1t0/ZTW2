import { Component } from '@angular/core';

@Component({
    selector: 'newoffer',
    templateUrl: './app/components/newoffer.component.html',
    styles: ['app/components/newoffer.css']
})
export class NewOfferComponent {

    hack(val) {
        console.log('Before:');
        console.log(val);
        return val;
       
    }

    public makes = [
        {
            car: { value: 'audi', display: 'Audi' }, makeModels : [{ value: 'A4', display: 'A4' },
                { value: 'A5', display: 'A5' },
                { value: 'A7', display: 'A7' }]
        },
        {
            car: { value: 'bmw', display: 'BMW' }, makeModels: [{ value: 'Seria 3', display: 'Seria 3' },
            { value: 'Seria 5', display: 'Seria 5' },
            { value: 'Seria 7', display: 'Seria 7' }]
        }

    ];

    public mercedes = [
        { value: 'A-klasa', display: 'A-klasa' },
        { value: 'B-klasa', display: 'B-klasa' }

    ];

    public aston = [
        { value: 'DB-8', display: 'DB-8' },
        { value: 'DB-9', display: 'Db-9' }

    ];

    public fuels = [
        { value: 'benzyna', display: 'Benzyna' },
        { value: 'benzynalpg', display: 'Benzyna + LPG' },
        { value: 'diesel', display: 'Diesel' },
        { value: 'elektryczny', display: 'Elektryczny' },
        { value: 'hybrydowy', display: 'hybrydowy' }
    ];

    public drives = [
        { value: 'fwd', display: 'Przedni' },
        { value: 'rwd', display: 'Tylny' },
        { value: 'awd', display: 'Na wszystkie koła' }
    ];

    public seats = [
        { value: '1', display: '1' },
        { value: '2', display: '2' },
        { value: '3', display: '3' },
        { value: '4', display: '4' },
        { value: '5', display: '5' },
        { value: '6', display: '6' },
        { value: '7', display: '7' }
    ];

    public doors = [
        { value: '2/3', display: '2/3' },
        { value: '4/5', display: '4/5' }
    ];

    public colors = [
        { value: 'niebieski', display: 'Niebieski' },
        { value: 'biały', display: 'Biały' },
        { value: 'czarny', display: 'Czarny' },
        { value: 'czerwony', display: 'Czerowny' },
        { value: 'granatowy', display: 'Granatowy' },
        { value: 'pomarańczowy', display: 'Pomarańczowy' },
        { value: 'srebrny', display: 'Srebrny' },
        { value: 'zielony', display: 'Zielony' },
        { value: 'żółty', display: 'Żółty' }
    ];

    public types = [
        { value: 'sedan/limuzyna', display: 'Sedan/Limuzyna' },
        { value: 'kombi', display: 'Kombi' },
        { value: 'coupe', display: 'Coupe' },
        { value: 'hatchback', display: 'Hatchback' },
        { value: 'kabriolet', display: 'Kabriolet' },
        { value: 'terenowy', display: 'Terenowy' },
        { value: 'VAN', display: 'VAN' },
        { value: 'SUV', display: 'SUV' }
    ];



    constructor() {

    }
}