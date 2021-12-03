import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderRepository } from 'src/app/model/order.repository';
import { Order } from 'src/app/model/order.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  orderSent = false;
  submitted = false;
  orderID = 0;
  test: Order[];
  
  constructor(public repository: OrderRepository,
    public order: Order) {
    this.generateOrderId();
 
  }


  ngOnInit(): void {
    this.test = this.repository.getOrders().filter(o => this.orderID.toString() == o.orderid);
  }

  generateOrderId(): void {
    this.orderID = this.getRandomInt(1000);
  }

  checkOrderIDExists(): boolean {
    this.test = this.repository.getOrders().filter(o => this.orderID.toString() == o.orderid);
    if(this.test.length != 0){
      return true
    }
    return false;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  submitOrder(form: NgForm): void {
    this.submitted = true;
    while(this.checkOrderIDExists()){
      this.generateOrderId();
    }
    if (form.valid) {
      this.order.orderid = this.orderID.toString();
      this.repository.saveOrder(this.order).subscribe(order => {
        this.order.clear();
        this.orderSent = true;
        this.submitted = false;
      });
    }
  }

}
