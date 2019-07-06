import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: []
})
export class GraficaComponent implements OnInit {
  @Input() public leyenda: string = 'Sin nombre';
  @Input() public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() public doughnutChartData: number[] = [350, 450, 100];
  @Input() public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit() {}
}
