import { Injectable } from '@angular/core';
import { IKnowledge } from '../interfaces/iknowledge.interface';
import { KNOWLEDGES } from '../../database/knowledge.db';

@Injectable({
  providedIn: 'root'
})
export class KnowledgesService {

  knowledges: IKnowledge[] = KNOWLEDGES

  constructor() { }

  getAllKnowledges(): IKnowledge[] {
    return this.knowledges;
  }
}
