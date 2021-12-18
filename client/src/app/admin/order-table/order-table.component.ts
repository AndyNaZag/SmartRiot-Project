import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit
{
  includeApproved = false;
  includeRejected = false;
  all = false;
  
  constructor(private repository: OrderRepository,
              private router: Router) { }

  ngOnInit(): void {
  }

  getOrders(): Order[]
  { 
    if (this.includeApproved) {return this.repository.getOrders().filter(o => (o.approved));}
    else if (this.includeRejected) {return this.repository.getOrders().filter(o => (o.rejected));}
    else if (this.all) {return this.repository.getOrders().filter(o => (!o.approved || !o.rejected));}
    else {return this.repository.getOrders().filter(o => (!o.approved && !o.rejected));}
  }
  getRejectedOrders(): Order[]
  { 
    return this.repository.getOrders().filter(o => (this.includeRejected));
  }

  markApproved(order: Order): void
  {
    order.approved = (order.approved) ? false : true;    
    this.repository.updateOrder(order);
    this.router.navigateByUrl('/admin/main/orders');    
  }

  markRejected(order: Order): void
  {
    order.rejected = (order.rejected) ? false : true;   
    this.repository.updateOrder(order);
    this.router.navigateByUrl('/admin/main/orders');
  }

  /*delete(id: number): void
  {
    if (confirm('Are you sure?'))
    {
      this.repository.deleteOrder(id);
    }
    else
    {
      this.router.navigateByUrl('/admin/main/orders');
    }
  }*/

}
