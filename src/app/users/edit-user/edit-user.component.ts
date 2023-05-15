import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User = new User();

  constructor(private route: ActivatedRoute,private userService: UserService, private router: Router) { }

  ngOnInit() {
    // Retrieve the user from the API
    const id = this.route.snapshot.params['id'];
    this.userService.getUserById(id).subscribe(user => this.user = user);
  }

  editUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe(user => {
      this.router.navigate(['/']);
    });
  }
}
