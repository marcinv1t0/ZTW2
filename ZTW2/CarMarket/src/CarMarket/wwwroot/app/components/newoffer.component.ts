import { Component } from '@angular/core';

@Component({
    selector: 'newoffer',
    templateUrl: './app/components/newoffer.component.html',
    styles: ['app/components/newoffer.css']
})
export class NewOfferComponent {

    public makes = [
        { value: 'audi', display: 'Audi' },
        { value: 'aston', display: 'Aston Martin' },
        { value: 'bentley', display: 'Bentley' },
        { value: 'cadillac', display: 'Cadillac' },
        { value: 'kia', display: 'Kia' },
        { value: 'mercedes', display: 'Mercedes' },
        { value: 'porsche', display: 'Porsche' },        
        { value: 'subaru', display: 'Subaru' },
        { value: 'volkswagen', display: 'Volkswagen' }
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