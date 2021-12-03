import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { OrderRepository } from 'src/app/model/order.repository';

@Component({
  templateUrl: './order-table.component.html',
})
export class OrderTableComponent implements OnInit
{
  includeApproved = false;
  
  constructor(private repository: OrderRepository,
              private router: Router) { }

  ngOnInit(): void {
  }

  getOrders(): Order[]
  { 
    return this.repository.getOrders().filter(o => this.includeApproved || !o.approved);
  }

  markApproved(order: Order): void
  {
    order.approved = (order.approved) ? false : true;
    this.repository.updateOrder(order);
    this.router.navigateByUrl('/admin/main/orders');
  }

  delete(id: number): void
  {
    if (confirm('Are you sure?'))
    {
      this.repository.deleteOrder(id);
    }
    else
    {
      this.router.navigateByUrl('/admin/main/orders');
    }
  }

}
