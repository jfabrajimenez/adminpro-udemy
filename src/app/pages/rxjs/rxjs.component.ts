import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  constructor() {
    this.subscripcion = this.devuelveObservable().subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador ha terminado')
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscripcion.unsubscribe();
  }

  devuelveObservable(): Observable<any> {
    const obs: Observable<any> = new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          // Impar
          return true;
        } else {
          // Par
          return false;
        }
      })
    );

    return obs;
  }
}
