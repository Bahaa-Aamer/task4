import { Component } from '@angular/core';
import { OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  form: FormGroup;
  data = [];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(15),
        Validators.pattern(/^[a-zA-Z0-9 ]+$/),
      ]),
    });
  }
  submit(task: { title: string; description: string }) {
    console.log();
    if (this.form.status != 'INVALID') {
      this.data.push(task);
     
    } else alert('Incorrect details.');
  }

  ondelete(deletedTitle) {
    this.data.splice(deletedTitle, 1);
  }
}
