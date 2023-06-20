import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from 'src/app/components/create/create.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private routeActive: Router, private modalService: NgbModal, private authService: AuthService, private event: EventService) { }
  stepLimit = 1;
  stepScope = 1;
  search = '';
  ngOnInit() {
    const user = this.authService.getUser();
    if (!user) {
      this.modalService.open(LoginComponent, { size: 'md', backdrop: 'static', keyboard: false, scrollable: true });
    }
    this.event.getEvent().subscribe(
      (res: any) => {
        if (res.event == "stepLimit") {
          this.stepScope++;
        }
      }
    )
    window.addEventListener('scroll', () => {
      if (this.routeActive.url == "/") {

        if ((window.innerHeight + Math.round(window.scrollY) + 100) >= document.body.offsetHeight) {
          this.stepLimit++;
          if (this.stepLimit != this.stepScope) return;

          this.event.sendEvent('search', { data: this.search + '&step=' + this.stepLimit, isscroll: true });
        }
      }
    });
  }

  createNew() {
    const m = this.modalService.open(CreateComponent, { size: 'md' });
  }

  changeDataS(event: any) {
    this.search = event.target.value;
    this.event.sendEvent('search', { data: this.search });
  }

  logOut() {
    localStorage.removeItem('user');
    this.modalService.open(LoginComponent, { size: 'md', backdrop: 'static', keyboard: false, scrollable: true });
  }
}
