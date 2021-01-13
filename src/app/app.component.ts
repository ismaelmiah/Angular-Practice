import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupform: FormGroup;
  forbiddenUsername = ['ismail', 'rana'];

  ngOnInit(): void {
    this.signupform = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });

    // this.signupform.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    this.signupform.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupform.setValue({
      'userData': {
        'username': 'ismail',
        'email': 'ismil96@gmail.com'
      },
      'gender' : 'male',
      'hobbies' : []
    })
    this.signupform.patchValue({
      'userData': {
        'username': 'Rana',
      }
    })
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupform.get('hobbies')).push(control);
    console.log(<FormArray>this.signupform.get('hobbies'));
  }

  onSubmit() {
    console.log(this.signupform);
    this.signupform.reset();
  }

  //Synchronus Validator
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsername.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  //Asynchronus Validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsforbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
