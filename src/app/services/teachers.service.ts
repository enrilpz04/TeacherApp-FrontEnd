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

  getTeachersFiltered(users: IUser[], filterOptions: IFilterOptions) : ITeacher[]{
    const userIds = users.map(user => user.id);
    console.log(userIds)
    let teachers = this.teachers.filter(teacher => userIds.includes(teacher.user_id));

    if (filterOptions.knowledge !== '' && filterOptions.knowledge !== null) {
      teachers = teachers.filter(teacher => {
        teacher.knowledges.filter(knowledge => knowledge.name === filterOptions.knowledge)
      });
    }

    if (filterOptions.minPrice !== null) {
      teachers = teachers.filter(teacher => teacher.price_p_hour >= filterOptions.minPrice);
    }

    if (filterOptions.maxPrice !== null) {
      teachers = teachers.filter(teacher => teacher.price_p_hour <= filterOptions.maxPrice);
    }

    console.log(teachers)
    return teachers;
  }
}
