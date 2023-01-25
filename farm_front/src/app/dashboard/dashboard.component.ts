import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farm } from '../models/Farm';
import { FarmService } from '../services/farm.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})
export class DashboardComponent implements OnInit {
  farms: Farm[] = []
  constructor(private farmService: FarmService, private router: Router){}

  ngOnInit(): void {
    this.farmService.list().subscribe( data => {
      this.farms = data;
    })
  }
  farmDetails(id: number){
    this.router.navigateByUrl(`/details/${id}`)
  }
}

/*  */
