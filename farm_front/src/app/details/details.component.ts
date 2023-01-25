import { state } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Farm } from '../models/Farm'
import { FarmService } from '../services/farm.service'

@Component({
  selector: 'app-details',
  templateUrl: 'details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  farm: Farm = {
    name: '',
    geometry: {
      coordinates: [],
      type: '',
    },
    area: 0,
    centroid: [],
    ownerid: 0,
  }
  farmId: string
  constructor(
    private farmService: FarmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.farmId = this.route.snapshot.paramMap.get('id') as any
  }
  async ngOnInit() {
    try {
      const farm = await this.farmService.read(parseInt(this.farmId))
      if (farm) {
        this.farm.name = farm.name
        this.farm.area = farm.area
        this.farm.geometry.type = farm.geometry.type
        this.farm.geometry.coordinates = farm.geometry.coordinates
        this.farm.centroid = farm.centroid
        this.farm.ownerid = farm.ownerid
        console.log(farm)
      } else {
        this.router.navigateByUrl(``)
      }
    } catch (error) {
      console.log(error)
    }
  }

  delete() {
    this.farmService.deleteFarm(parseInt(this.farmId))
    this.router.navigateByUrl(``)
    return 
  }

  edit() {
    this.router.navigate(['/register', this.farmId, 'edit'])
  }
}
