import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import { BookingService } from 'src/app/services/booking.service';

export interface MenuItem {
  id: string,
  name: string;
  description: string;
  price: number;
}

const MENULIST_DATA: MenuItem[] = [
  {id: '1', name: 'Korma', description: "A very mild, sweet creamy texture Very Mild", price: 12.50},
  {id: '2', name: 'Chicken Tikka Masala', description: "Chicken barbecued, into a rich masala dish with cream", price: 12.50},
  {id: '3', name: 'Madras', description: "A fairly hot consistency Fairly Hot", price: 11.50},
  {id: '4', name: 'Chicken Tikka Starter', description: "Chicken pieces marinated & barbecued", price: 2.50},
  {id: '5', name: 'Chilli Chicken', description: "Chicken with herbs & spices & fresh chillies", price: 12.50},
  {id: '6', name: 'King Prawn Butterfly', description: "King prawns deep fried & battered", price: 3.50},
];

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'acction'];
  dataSource = MENULIST_DATA;

  selectedItems: MenuItem[] = []
  totalPayment: number = 0

  getBooking = {_id: ""}
  bookingInfo = {
    customerId: "",
    bookingId: ""
  }

  constructor(
    private _router: Router,
    private _acctivatedRoute: ActivatedRoute,
    private _auth: AuthService,
    private _bookingService: BookingService) { }

  ngOnInit() {
    this._acctivatedRoute.paramMap
      .subscribe(params => {
        this.getBooking._id = params.get('bookId')
      }
    );
    
    this._bookingService.getBookingById(this.getBooking)
      .subscribe(
        res => {
          var booking = res.booking
          this.bookingInfo.customerId = booking.customerId
          this.bookingInfo.bookingId = booking._id
          console.log(this.bookingInfo)
        },
        err => {
          alert(err.error.message);
          this._router.navigate(["/my-bookings"])
        }
      )
  }

  calculateTotal(){
    var prices = 0
    this.selectedItems.forEach(item => prices += item.price)
    this.totalPayment = prices
  }

  add(item: MenuItem){
    this.selectedItems.push(item);
    this.calculateTotal();
  }

  remove() {
    this.selectedItems.pop();
    this.calculateTotal();
  }

  confirmeOrder(){
    var order = {
      customerId: this.bookingInfo.customerId,
      bookingId: this.bookingInfo.bookingId,
      orderList: this.selectedItems,
      totalPayment: this.totalPayment.toString()
    }

    this._auth.takeOrder(order)
      .subscribe(
        res => {
          var booking = {
            _id: res.order.bookingId
          }
          this._bookingService.BookingStatusToOrdered(booking).subscribe(
            _ => {
              console.log(res)
              alert(`order confirmed, your order no. ${res.order._id}`)
              this._router.navigate([''])
            }
          )
        },
        err => alert(err.error.message)
      )
  }
}

