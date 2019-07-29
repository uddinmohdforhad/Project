import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export class OrderItemObject {
  name: string
  price: number
}
export class MyOrderObject {
  id: string
  totalPrice: string
  orderList: OrderItemObject[]
  date: string
}

@Component({
  selector: 'previous-order',
  templateUrl: './previous-order.component.html',
  styleUrls: ['./previous-order.component.css']
})
export class PreviousOrderComponent implements OnInit {
  getOrderId = {_id: ""};
  myOrder = new MyOrderObject;
  
  constructor(
    private _router: Router,
    private _acctivatedRoute: ActivatedRoute,
    private _auth: AuthService) { }

  ngOnInit() {
    this._acctivatedRoute.paramMap
      .subscribe(params => {
        console.log(this.getOrderId)
        this.getOrderId._id = params.get('id')
        console.log(this.getOrderId)
      }
    );
    
    this._auth.getOrderById(this.getOrderId).subscribe(
      res => {
        this.myOrder.id = res.order._id
        this.myOrder.totalPrice = res.order.totalPayment
        this.myOrder.date = this.getBiutifyDateString(res.order.date)
        var orderList = new Array<OrderItemObject>();
        res.order.orderList.forEach(item => {
          orderList.push({name: item.name, price: item.price})
        });
        this.myOrder.orderList = orderList;
        console.log(this.myOrder)
      },
      err => {
        alert(err.error.message);
        this._router.navigate(["/my-bookings"])
      }
    )
  }

  getBiutifyDateString(date: string){
    var str = date;
    return `${str.slice(0,4)}-${str.slice(4,6)}-${str.slice(6,8)}`
  }
}
