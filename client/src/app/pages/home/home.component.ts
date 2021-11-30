import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from '../../partials/base-page/base-page.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {

  constructor(route: ActivatedRoute, private router: Router) {
    super(route);
   }

  ngOnInit(): void {
  }

  navigateToDogs(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Dogs' } });
  }
  navigateToCats(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Cats' } });
  }
  navigateToBirds(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Birds' } });
  }
  navigateToBunnies(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Bunnies' } });
  }
  navigateToLizards(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Lizards' } });
  }
  navigateToHamsters(){
    this.router.navigate(['/pet-list'], { queryParams: { category: 'Hamsters' } });
  }
}
