import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any = {};
  constructor(private authService: AuthService, private activeModal: NgbActiveModal, private event: EventService) {

  }

  async login() {
    const res: any = await this.authService.loginAndRegister(this.user);
    if (res) {
      this.authService.saveUser(res.payload);
      this.event.sendEvent("refresh", {});
      this.activeModal.close();
    }
  }
}
