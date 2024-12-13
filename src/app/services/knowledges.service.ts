import { inject, Injectable } from '@angular/core';
import { IKnowledge } from '../interfaces/iknowledge.interface';
import { KNOWLEDGES } from '../../database/knowledge.db';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgesService {

  knowledges: IKnowledge[] = KNOWLEDGES
  private apiUrl = 'http://localhost:3000/api/knowledges';
  private apiUrlTeachKnow= 'http://localhost:300/api/teacherknowledge';
  private http = inject(HttpClient)

  constructor() { }

  getAllKnowledges():Promise<IKnowledge[]> {
    return firstValueFrom(this.http.get<any>(this.apiUrl)).then(response=>{
      return response;
    })
  }

  postTeacherKnowledge(teacherId:number, knowledge:number):Promise<any>{
    const teacherknowldege={
      teacherId:teacherId,
      knowledge:knowledge
    }
    return firstValueFrom(this.http.post<any>(this.apiUrlTeachKnow,teacherknowldege)).then(response=>{
      return response
    })
  }
}
