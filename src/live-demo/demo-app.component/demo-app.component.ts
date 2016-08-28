import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/Rx';

import { AirportsService } from '../shared';

@Component({
  encapsulation: ViewEncapsulation.None,
  moduleId: module.id,
  providers: [AirportsService],
  selector: 'rt-demo-app',
  styleUrls: ['demo-app.component.css'],
  templateUrl: 'demo-app.component.html'
})
export class DemoAppComponent {
}
