import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgControl,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  form: FormGroup;
  data = [];
  matchingTitle: boolean = false;
  lang;
  constructor() {}

  ngOnInit(): void {
    this.lang = localStorage.getItem('lang') ;

    this.form = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        this.checkMatching.bind(this),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
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
    console.log(selectedLang);
    window.location.reload();
  }
}
