import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() viewMode = false;
  @Input() currentUser: User = {
    id:0,
    name: '',
    age:0,
    address:'',
    symptoms:'',
    email:'',
    phonenumber:''
  };
  
  message = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }
  getUser(id: number): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  updatePublished(status: boolean): void {
    const data = {
      name: this.currentUser.name,
      age: this.currentUser.age,
      address:this.currentUser.address,
      symptoms:this.currentUser.symptoms,
      email:this.currentUser.email,
      phonenumber:this.currentUser.phonenumber ,
      
    };
    this.message = '';
    this.userService.update(this.currentUser.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  updateUser(): void {
    this.message = '';
    this.userService.update(this.currentUser.id, this.currentUser)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message ? res.message : 'This user was updated successfully!';
      },
      error: (e) => console.error(e)
    });
}
  
  // deleteUser(): void {
  //   this.userService.delete(this.currentUser.id)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.message = res.message ? res.message : 'This user was delete successfully!';
  //         this.router.navigate(['/user']);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}