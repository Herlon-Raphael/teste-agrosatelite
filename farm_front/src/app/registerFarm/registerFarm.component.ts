import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FarmService } from '../services/farm.service'
import { Farm } from '../models/Farm'
import { GeoJsonFeature, pointClickStyle } from '@common/geolib'
import { BasemapComponent } from '../basemap/basemap.component'
import { MapService } from '../map.service'
import { DrawAddon } from '@common/draw'
import { GeoJsonFeatureAddon } from '@common/feature'
import GeoJSON from 'ol/format/GeoJSON'

@Component({
  selector: 'app-registerFarm',
  templateUrl: './registerFarm.component.html',
  styleUrls: ['./registerFarm.component.scss'],
})
export class registerFarm implements OnInit {
  private _map!: BasemapComponent
  private _geometries: GeoJsonFeature[] = []

  registerForm: FormGroup
  constructor(
    private _mapService: MapService,
    private formBuilder: FormBuilder,
    private farmsService: FarmService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      area: ['', [Validators.required]],
      centroide1: ['', [Validators.required]],
      centroide2: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      coordenadas: ['', [Validators.required]],
      iddono: ['', [Validators.required]],
    })
  }
  ngOnInit() {
    this._map = this._mapService.map
  }
  async onSubmit() {
    try {
      const owner = await this.farmsService.readOwner(this.registerForm.value.iddono)
      if (owner) {
        const farm: Farm = {
          name: this.registerForm.value.name,
          area: parseFloat(this.registerForm.value.area),
          centroid: [this.registerForm.value.centroide1, this.registerForm.value.centroide2],
          geometry: {
            type: this.registerForm.value.tipo,
            coordinates: this.registerForm.value.coordenadas,
          },
          creation_date:
            new Date() /* new Date().toLocaleString() mais fácil de administrar na database */,
          ownerid: this.registerForm.value.iddono,
        }
        console.log(farm)
        this.farmsService.create(farm).subscribe((e) => alert('Fazenda criada com sucesso!'))
      } else {
        alert('Dono não registrado')
      }
    } catch (error) {
      console.log(error)
    }
  }

  draw(type: 'Circle') {
    if (!this._map) return
    this._map.includeAddon(
      new DrawAddon({
        identifier: 'geometry_map',
        drawType: type,
        callback: (geometry) => {
          const geo = new GeoJSON().writeGeometryObject(geometry) as any
          this.handleNewGeometry(geo)
        },
      })
    )
  }

  geometrySeed: number = 1
  handleNewGeometry(geometry: any) {
    const identifier = this.geometrySeed++
    this._map.includeAddon(
      new GeoJsonFeatureAddon({
        identifier: `geometry::${identifier}`,
        feature: geometry,
        styleFunction: () => {
          return pointClickStyle({
            hover: false,
            strokeColor: '#1962D1',
          })
        },
      })
    )
    this._map.fitToAddons(this._map.listByPrefix('geometry'))
    console.log('New geometry', geometry)
    this._geometries.push(geometry)
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      area: [geometry.q, [Validators.required]],
      centroide1: ['', [Validators.required]],
      centroide2: ['', [Validators.required]],
      tipo: [geometry.type, [Validators.required]],
      coordenadas: [geometry.coordinates, [Validators.required]],
      iddono: ['', [Validators.required]],
    })
  }

  ngOnDestroy() {
    this._map.removeByPrefix('geometry')
  }
}
