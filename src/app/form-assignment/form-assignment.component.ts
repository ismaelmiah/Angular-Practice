import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-form-assignment',
  templateUrl: './form-assignment.component.html',
  styleUrls: ['./form-assignment.component.css'],
})
export class FormAssignmentComponent implements OnInit {
  signUpform: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signUpform = new FormGroup({
      projectName: new FormControl(
        null,
        [Validators.required, CustomValidators.invalidProjectName.bind(this)],
        CustomValidators.asyncInvalidProjectName
      ),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl('critical'),
    });
  }
  onSubmit() {
    console.log(this.signUpform);
  }
}
