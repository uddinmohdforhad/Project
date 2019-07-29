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
  {id: '7', name: 'Fish Pakora', description: "Spiced fish deep fried with butter", price: 3.50},
  {id: '8', name: 'Prawn Puri', description: "Deep fired bread with prawn stuffing", price: 3.40},
  {id: '9', name: 'Fish Tikka', description: "Spacied fish cooked in tanduri oven", price: 5.80},
  {id: '10', name: 'Prawn Cocktail', description: "Prawns in a cocktail souce", price: 3.50},
  {id: '11', name: 'Onion Bahja', description: "Deep fried spaced onion balls", price: 3.60},
  {id: '12', name: 'Mixed Kebbab', description: "Chicken and lamb meet on gril", price: 7.50},
  {id: '13', name: 'Lamb Tikka', description: "Lamb marinated and barbequed", price: 5.50},
  {id: '14', name: 'Shish Kebbab', description: "Minced meet tanduried", price: 7.50},
  {id: '15', name: 'Meet Sambousak', description: "Deep fried meet pasties", price: 4.80},
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
            _id: res.order.bookingId,
            orderId: res.order._id
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

