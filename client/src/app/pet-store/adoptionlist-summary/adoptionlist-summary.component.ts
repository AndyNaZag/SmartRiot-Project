import { Component, OnInit } from '@angular/core';
import { Adoptionlist } from 'src/app/model/adoptionlist.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoptionlist-summary',
  templateUrl: './adoptionlist-summary.component.html',
  styleUrls: ['./adoptionlist-summary.component.css']
})
export class AdoptionlistSummaryComponent implements OnInit {

  constructor(public adoptionlist: Adoptionlist,
              public router: Router) { }

  ngOnInit(): void {
  }

  viewAdoptionlist(): void
  {
    this.router.navigateByUrl('/adoptionlist');
  }

}