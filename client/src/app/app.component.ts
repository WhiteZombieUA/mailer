import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private http: HttpClient){}

  name: string = '';
  surname: string = '';
  company: string = '';
  emails: any[];

  onNameKeyUP(event: any) {
    this.name = event.target.value;
  }
  onSurnameKeyUP(event: any) {
    this.surname = event.target.value;
  }
  onCompanyKeyUP(event: any) {
    this.company = event.target.value;
  }

  getEmails() {
    let url: string = 'http://localhost:5000/mails?name='+this.name+'&surname='+this.surname+'&company='+this.company;
    console.log(url);

    this.http.get(url)
      .subscribe(data => {
        this.emails = data.emails;
    });
  }

}
