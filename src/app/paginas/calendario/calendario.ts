import { Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  styleUrl: './calendario.css',
  templateUrl: './calendario.html',
})
export class Calendario {
  protected readonly dias = [
    { numero: 31, atenuado: true },
    { numero: 1 }, { numero: 2 }, { numero: 3 }, { numero: 4 }, { numero: 5 }, { numero: 6 },
    { numero: 7 }, { numero: 8 }, { numero: 9 }, { numero: 10 }, { numero: 11, hoy: true, punto: 'personal' }, { numero: 12 }, { numero: 13 },
    { numero: 14 }, { numero: 15 }, { numero: 16 }, { numero: 17 }, { numero: 18, punto: 'trabajo' }, { numero: 19 }, { numero: 20 },
    { numero: 21 }, { numero: 22 }, { numero: 23 }, { numero: 24 }, { numero: 25 }, { numero: 26 }, { numero: 27 },
    { numero: 28 }, { numero: 29 }, { numero: 30 },
    { numero: 1, atenuado: true }, { numero: 2, atenuado: true }, { numero: 3, atenuado: true }, { numero: 4, atenuado: true },
  ];
}
