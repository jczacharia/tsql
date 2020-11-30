import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TSQLAngularModule } from '@tsql/angular';
import { ApiFacadeService } from './api.facade';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TSQLAngularModule.forRoot({
      apiUrl: 'http://localhost:3333',
      operations: ApiFacadeService,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
