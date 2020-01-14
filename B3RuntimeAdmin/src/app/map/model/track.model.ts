import { Category } from "../../quiz/model/category.model";
import { Participant } from "../../event/model/participant.model";
import { ControlPoint } from "./control-point.model";
import { Happening } from "../../event/model/happening.model";

export interface Track {
    key?: string,
    name: string,
    categoryKeys?: string[],
    controlPoints?: ControlPoint[],
  }