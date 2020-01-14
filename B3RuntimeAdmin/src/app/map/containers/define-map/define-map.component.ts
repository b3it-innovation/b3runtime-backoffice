import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatListOption } from '@angular/material';
import { MapLocation } from '../../model/map-location.model';
import { MapStoreService } from '../../store/map-store.service';
import { AddTrackRequest, AddControlPointRequest, AddControlPointsRequest } from '../../payload/track';
import { ControlPoint } from '../../model/control-point.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActionState } from '../../model/action-state.model';
import { MapState } from '../../store/map.state';
import { RouterNGRXService } from '../../../core/store/router/app-router.service';
import { QuizStoreService } from '../../../quiz/store/quiz-store.service';
import { Question } from '../../../quiz/model/question.model';
import { ControlContainer } from '@angular/forms';


@Component({
  selector: 'app-define-map',
  templateUrl: './define-map.component.html',
  styleUrls: ['./define-map.component.scss']
})
export class DefineMapComponent implements OnInit, OnDestroy {

  title = 'My first AGM project';
  startLatitude = 59.3334731;
  startLongitude = 18.0522884;
  zoomLevel = 13;

  questionTitle = '';
  questionKey = '';
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  mapLocations: MapLocation[] = [];
  controlPoints: ControlPoint[] = [];
  unStoredControlPoints: ControlPoint[] = [];


  constructor(
    private mapStoreService: MapStoreService,
    //TODO Är det ok att dra in QuizStore här? 
    private quizStoreService: QuizStoreService,
    private routerService: RouterNGRXService

  ) {

  }

  ngOnInit() {
    this.subscribeToStores();
  }

  onDrop(event) {
    this.mapLocations[parseInt(event.target.id)].questionTitle = this.questionTitle;
    this.unStoredControlPoints.push({
      mapLocation: this.mapLocations[parseInt(event.target.id)],
      text: this.mapLocations[parseInt(event.target.id)].label ? this.mapLocations[parseInt(event.target.id)].label : '',
      questionKey: this.questionKey,
      orderInTrack: parseInt(event.target.id)
    });
    event.preventDefault();
  }
  allowDrop(event) {
    event.preventDefault();
  }


  ngOnDestroy(): void {
    this.stopAllSubscriptions();
  }

  private subscribeToStores() {
    this.mapStoreService.selectControlPoints().takeUntil(this.ngUnsubscribe).subscribe((controlPoints) => {
      this.controlPoints = controlPoints;
    });

    this.quizStoreService.selectDraggedQuestion().takeUntil(this.ngUnsubscribe).subscribe((load: any) => {
      if (load.question) {
        this.questionTitle = load.question.title;
        this.questionKey = load.question.key;
      }
    });
  }

  private stopAllSubscriptions() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onAddLocation(event) {
    this.mapLocations.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      label: '',
      draggable: true
    })
  }

  onDeleteLocations(locationIndex) {
    this.mapLocations.splice(locationIndex, 1);
  }

  onSelectLocation(event) {
    console.log('11111', event);
  }

  onUpdateLabelForLocation(label: string, index: number) {
    this.updatedMapLocationLabel(label, index);
  }

  saveControlPoints() {
    var count = 0;
    this.mapLocations.forEach((location: MapLocation) => {
      if (!location.questionTitle) {
        this.unStoredControlPoints.push({
          mapLocation: location,
          text: location.label ? location.label : '',
          orderInTrack: count
        })
      }
      count++;
    });

    const requestPoints: AddControlPointsRequest = {
      controlPoints: this.unStoredControlPoints
    }
    this.mapStoreService.addControlPoints(requestPoints);
  }

  onSaveMap() {
    this.saveControlPoints();
    this.controlPoints.forEach((point: ControlPoint) => {
      point.questionKey
    })
    const request: AddTrackRequest = {
      track: {
        name: 'namn på track',
        controlPoints: this.controlPoints,
        categoryKeys: []
      }
    }
    this.mapStoreService.addTrack(request);
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
