import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
 
 
   showError:boolean=false;
   errorMessage:any;
 
   showMessage: any;
   responseMessage: any;
   orderList: any=[];
   sortOrder: 'asc' | 'desc' = 'asc'
   statusModel:any={newStatus:null}
   paginatedList: any = []; // This will hold the items for the current page
   currentPage: number = 1; // Current page number
   itemsPerPage: number = 10; // Number of items per page
   constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
  {
  }  
 ngOnInit(): void {
   this.getOrders();
   }  
 
   getOrders() {
     this.orderList=[];
     this.httpService.getorders().subscribe((data: any) => {
       this.orderList=data;
       this. sortEventsByDate();
      console.log(data)
      this.updatePaginatedList();
     }, error => {
       // Handle error
       this.showError = true;
       this.errorMessage = "An error occurred while logging in. Please try again later.";
       console.error('Login error:', error);
     });;
   }
   viewDetails(details:any)
   {
   
   }
   edit(value:any)
   {
    this.statusModel.cargoId=value.id
   }
   update()
   {
    if(this.statusModel.newStatus!=null)
    {
      this.showMessage = false;
      this.httpService.UpdateOrderStatus(this.statusModel.newStatus,this.statusModel.cargoId).subscribe((data: any) => {
        debugger;
        this.showMessage = true;
        this.responseMessage=`Status updated`;
        this.getOrders();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
   }
   onDelete(eventId: any): any {
 
    this.httpService.delete(eventId).subscribe(()=>{
    this.getOrders();
    console.log(eventId);
   });
 }
 sortEventsByDate() {
  this.orderList.sort((c:any, d:any) => {
    const dateA = new Date(c.orderDate).getTime();
    const dateB = new Date(d.orderDate).getTime();
    return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
}
 
toggleSortOrder() {
  this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  this.sortEventsByDate();
}
searchTitle:string='';
  searchCharity(){
    if(this.searchTitle.trim().length!=0){
      this.orderList=this.orderList.filter((p:any)=>{
        return p.equipment.hospital.name.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    }else{
      this.getOrders();
    }
  }
  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedList = this.orderList.slice(startIndex, endIndex);
  }
 
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedList();
  }
 
  get totalPages(): number {
    return Math.ceil(this.orderList.length / this.itemsPerPage);
  }
 }
 
 