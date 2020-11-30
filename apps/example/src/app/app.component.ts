import { Component } from '@angular/core';
import { ApiFacadeService } from './api.facade';

@Component({
  selector: 'tsql-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.api.getJobPost(
    { id: '1' },
    {
      id: true,
      ownedBy: {
        id: true,
      },
    }
  );
  constructor(private readonly api: ApiFacadeService) {
    // this.hello$.subscribe((s) => s.id);
  }
}
