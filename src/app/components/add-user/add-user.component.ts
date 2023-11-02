import { Component, OnInit } from '@angular/core';
import { User} from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = {
    name: '',
    age:0,
    address:'',
    symptoms:'',
    email:'',
    phonenumber:'',
  };
  submitted = false;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
  }
  saveUser(): void {
    const data = {
      name: this.user.name,
      age: this.user.age,
      address:this.user.address,
      symptoms:this.user.symptoms,
      email:this.user.email,
      phonenumber :this.user.phonenumber 
      
    };
    this.userService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newUser(): void {
    this.submitted = false;
    this.user = {
      name: '',
      age:0,
      address:'',
      symptoms:'',
      email:'',
      phonenumber:''
    };
  }
}