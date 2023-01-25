import { Owner } from './Owner'
export interface Farm {
  name: string
  geometry: {
    type: string,
    coordinates: []
  }
  area: number
  centroid: number[]
  creation_date?: Date
  ownerid: number}
