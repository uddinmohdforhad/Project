import { Component, OnInit } from '@angular/core';

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
  selector: 'menuComponent',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price'];
  dataSource = MENULIST_DATA;

  constructor() { }

  ngOnInit() {
  }
}
