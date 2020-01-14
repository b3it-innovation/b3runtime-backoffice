import { ControlPoint_Question } from "./firebase-control-point-question.model";

export interface FirebaseTrack {
    key?: string,
    name: string,
    categoryKeys?: string[],
    controlPoints_questions?: ControlPoint_Question[],
  }