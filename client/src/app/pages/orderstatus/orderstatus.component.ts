import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderRepository } from 'src/app/model/order.repository';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-orderstatus',
  templateUrl: './orderstatus.component.html',
  styleUrls: ['./orderstatus.component.css']
})
export class OrderstatusComponent implements OnInit {
  orderID;
  test: Order[];
  status = "";

  constructor(public repository: OrderRepository,
    public order: Order) {
    this.orderID = 0;
  }

  ngOnInit(): void {
    this.test = this.repository.getOrders().filter(o => this.orderID.toString() == o.orderid);
  }

  checkOrderIDExists(): boolean {
    this.test = this.repository.getOrders().filter(o => this.orderID.toString() == o.orderid);
    if (this.test.length != 0) {
      return true
    }
    return false;
  }

  checkStatus(form: NgForm): void {
    if (form.valid) {
      //console.log(this.checkOrderIDExists());
      if (this.checkOrderIDExists()) {
        //for (var i = 0; i < this.test.length; ++i) {
        //console.log(this.test[i].approved);
        //}
        if (this.test[0].approved) {
          this.status = "Approved";
        } else {
          this.status = "Pending";
        }
      } else {
        this.status = "Either your request is rejected or order id does not exist";
      }
    }
  }
}
