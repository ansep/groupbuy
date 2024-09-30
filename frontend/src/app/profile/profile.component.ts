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
  updatedProfile: boolean = false;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    profilePicturePath: string;
  } | null = null;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username) {
      const loggedInUser = localStorage.getItem('username');
      if (this.username === loggedInUser) {
        this.isLoggedUser = true;
        this.route.queryParams.subscribe((params) => {
          if (params['reload'] === 'true') {
            this.router
              .navigate(
                [this.authService.getRole(), 'profile', this.username],
                {
                  queryParams: { edited: 'true' },
                }
              )
              .then(() => {
                window.location.reload();
              });
          }
          if (params['edited'] === 'true') {
            this.updatedProfile = true;
          }
        });
      }
      this.authService.getUserInfoByUsername(this.username).subscribe({
        next: (user: any) => {
          this.user = user;
          if (user.profilePicturePath) {
            this.avatar =
              `http://localhost:8080/api/user/${user.id}/picture?t=` +
              new Date().getTime();
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  editProfile() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/account']);
  }

  sendMessageToUser() {
    this.router.navigate([this.authService.getRole(), 'messages'], {
      queryParams: { user: this.user?.username },
    });
  }
}
