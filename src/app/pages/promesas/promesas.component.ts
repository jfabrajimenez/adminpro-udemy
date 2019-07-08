import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then(mensaje => console.log('Ha terminado', mensaje))
      .catch(error => console.error('Ha fallado ', error));
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    const promesa: Promise<boolean> = new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        if (contador === 3) {
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });

    return promesa;
  }
}
