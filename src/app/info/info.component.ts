import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  form: FormGroup;
  data = [];
  matchingTitle: boolean = false;
  lang: any;
  constructor(public translateService: TranslateService) {
    translateService.setDefaultLang('en');
    //  the lang to use if the selected lang is not available
    // translateService.use('en');
    // -------------
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang');
    this.translateService.use(this.lang);
    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        this.checkMatching.bind(this),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(/^[a-zA-Z0-9\u0600-\u06FF ]+$/),
      ]),
    });
  }

  submit(task: { title: string; description: string }) {
    if (this.form.status != 'INVALID') {
      this.data.push(task);
      this.form.reset();
    } else alert('Incorrect details.');
  }

  ondelete(deletedTitle) {
    this.data.splice(deletedTitle, 1);
  }

  checkMatching(control: FormControl) {
    for (let i of this.data) {
      if (control.value === i.title) {
        this.matchingTitle = true;
        return { checkMatching: true };
      }
    }
    this.matchingTitle = false;
    return null;
  }

  changeLang(lang) {
    const selectedLang = lang.value;
    localStorage.setItem('lang', selectedLang);

  
    window.location.reload();
    
  }
}
