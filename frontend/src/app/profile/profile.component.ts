import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    const loggedInUser = localStorage.getItem('username');
    if (this.username === loggedInUser) {
      this.isLoggedUser = true;
    }
    this.authService.getUserInfo().subscribe({
      next: (user) => {
        if (user.profile_picture_path) {
          this.avatar = `http://localhost:8080/api/user/${user.id}/picture`;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  editProfile() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/account']);
  }
}
