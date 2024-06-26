import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  isLoggedUser = false;
  avatar = 'assets/default-avatar-lg.png';
  username: string | null = null;
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    const loggedInUser = localStorage.getItem('username');
    if (this.username === loggedInUser) {
      this.isLoggedUser = true;
    }
  }

  editProfile() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/account']);
  }
}
