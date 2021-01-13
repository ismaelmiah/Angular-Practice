import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupform: NgForm;
  genders = ['male', 'female'];
  answer='';
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    gender: ''
  }

  defaultQuestion = 'teacher';

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupform.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   defaultQuestion: '',
    //   gender: 'male'
    // })
    this.signupform.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }
  // onSubmit(form: NgForm){
  //   console.log(form)
  // }

  submitted = false;

  onSubmit(){
    this.submitted = true;
    this.user.username = this.signupform.value.userData.username;
    this.user.email = this.signupform.value.userData.email;
    this.user.secretQuestion = this.signupform.value.secret;
    this.user.gender = this.signupform.value.gender;
    this.signupform.reset();
  }
}
