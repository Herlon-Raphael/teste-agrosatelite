import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'

@Component({
  selector: 'app-editFarm',
  templateUrl: './editFarm.component.html',
  styleUrls: ['./editFarm.component.scss'],
})
export class editFarmComponent implements OnInit {
  editForm: FormGroup
  farmId: any
  farm: Farm = {
    name: '',
    geometry: {
      coordinates: [],
      type: '',
    },
    area: 0,
    centroid: [],
    ownerid: 0
  }
  constructor(
    private formBuilder: FormBuilder,
    private farmsService: FarmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.farmId = this.route.snapshot.params.id
    console.log(this.route.snapshot.params.id)
    this.editForm = this.formBuilder.group({
      name: [Validators.required],
      area: [Validators.required],
      centroide1: [Validators.required],
      centroide2: [Validators.required],
      tipo: [Validators.required],
      coordenadas: [Validators.required],
      iddono: ['000', Validators.required],
    })
  }
  async ngOnInit() {
    try {
      const farm = await this.farmsService.read(parseInt(this.farmId))
      if (farm) {
        this.editForm = this.formBuilder.group({
          name: [farm.name, Validators.required],
          area: [farm.area, Validators.required],
          centroide1: [farm.centroid[0], Validators.required],
          centroide2: [farm.centroid[1], Validators.required],
          tipo: [farm.geometry.type, Validators.required],
          coordenadas: [farm.geometry.coordinates, Validators.required],
          iddono: ['000', Validators.required],
        })
        console.log(farm)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmit() {
    try {
      console.log(this.editForm.value)
      const owner = await this.farmsService.readOwner(this.editForm.value.iddono)
      if (owner) {
        const farm: Farm = {
          name: this.editForm.value.name,
          area: parseFloat(this.editForm.value.area),
          centroid: [this.editForm.value.centroide1, this.editForm.value.centroide2],
          geometry: {
            type: this.editForm.value.tipo,
            coordinates: this.editForm.value.coordenadas,
          },
          creation_date:
            new Date() /* new Date().toLocaleString() mais fácil de administrar na database */,
          ownerid: this.editForm.value.iddono,
        }
        console.log(farm)
        this.farmsService.editFarm(this.farmId, farm)
        this.router.navigateByUrl(``)
      } else {
        alert('Dono não registrado')
      }
    } catch (error) {
      console.log(error)
    }
  }
}
