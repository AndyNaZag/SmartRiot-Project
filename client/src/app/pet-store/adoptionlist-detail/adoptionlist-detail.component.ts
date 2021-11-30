import { Component, OnInit } from '@angular/core';
import { Adoptionlist } from 'src/app/model/adoptionlist.model';

@Component({
  selector: 'app-adoptionlist-detail',
  templateUrl: './adoptionlist-detail.component.html',
  styleUrls: ['./adoptionlist-detail.component.css']
})
export class AdoptionlistDetailComponent implements OnInit {

  constructor(public adoptionlist: Adoptionlist) { }

  ngOnInit(): void {
  }

}
