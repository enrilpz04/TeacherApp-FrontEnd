import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { IFilterOptions } from '../interfaces/ifilter-options';
import { ITeacher } from '../interfaces/iteacher.interface';
import { TEACHERS } from '../../database/teacher.db';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  teachers : ITeacher[] = TEACHERS

  constructor() {

  }

  getTeachersFiltered(filterOptions: IFilterOptions) : ITeacher[]{
    return this.teachers;
  }
}
