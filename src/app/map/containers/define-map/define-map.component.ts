import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material';

@Component({
  selector: 'app-define-map',
  templateUrl: './define-map.component.html',
  styleUrls: ['./define-map.component.scss']
})
export class DefineMapComponent implements OnInit {

  counter = 0;
  title = 'My first AGM project';
  startLatitude = 59.3334731;
  startLongitude = 18.0522884;
  zoomLevel = 13;

  mapLocations: MapLocation[] = []

  constructor() { }

  ngOnInit() {
  }

  onAddLocation(event) {
    this.mapLocations.push({
      id: this.mapLocations.length + 1,
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: '',
      draggable: true
    })
  }

  onDeleteLocations(locationIndex) {
    this.mapLocations.splice(locationIndex, 1);
    this.updateMapLocationIds();
  }

  onSelectLocation(event) {
    console.log('11111', event);
  }

  onUpdateLabelForLocation(label: string, index: number) {
    this.updatedMapLocationLabel(label, index);
  }

  onSaveMap() {
    console.log('saving locations ', this.mapLocations, ' to database.')
  }

  onMoveUpLocation(index: number) {
    if (this.allowedToMoveLocationUp(index)) {
      this.moveLocationUp(index);
    }
  }

  onMoveDownLocation(index: number) {
    if (this.allowedToMoveLocationDown(index)) {
      this.moveLocationDown(index);
    }
  }

  private allowedToMoveLocationDown(index: number): boolean {
    return true ? (index < this.mapLocations.length - 1) : false;
  }

  private moveLocationDown(index: number) {
    const temp = this.mapLocations[index + 1];
    this.mapLocations[index + 1] = this.mapLocations[index];
    this.mapLocations[index] = temp;
  }

  private allowedToMoveLocationUp(index: number): boolean {
    return true ? (index > 0) : false;
  }

  private moveLocationUp(index: number) {
    const temp = this.mapLocations[index - 1];
    this.mapLocations[index - 1] = this.mapLocations[index];
    this.mapLocations[index] = temp;
  }

  markerClicked(event) {
    console.log('markerClicked', event);
  }

  updateMapLocationIds() {
    let counter = 0;
    this.mapLocations.map(item => item.id = counter++);
  }

  markerDragged(event, index: number) {
    this.updatedMapLocation(event.coords.lng, event.coords.lat, index);
  }

  updatedMapLocation(longitude: number, latitude: number, index: number) {
    this.mapLocations[index].lat = latitude;
    this.mapLocations[index].lng = longitude;
  }

  updatedMapLocationLabel(label: string, index: number) {
    this.mapLocations[index].label = label;
  }

}

// just an interface for type safety.
interface MapLocation {
  id: number,
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
