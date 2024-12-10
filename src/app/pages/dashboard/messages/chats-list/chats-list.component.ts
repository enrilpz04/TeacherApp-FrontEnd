import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.css'
})
export class ChatsListComponent {
  @Input() chats!: IUser[];
  @Output() chatSelected = new EventEmitter<IUser>();

  searchText: string = '';

  selectChat(chat : IUser) {
    this.chatSelected.emit(chat)
  }

  get filteredChats(): IUser[] {
    if (!this.searchText) {
      return this.chats;
    }

    const searchTextLower = this.searchText.toLowerCase();
    const regex = new RegExp(`^${searchTextLower.split('').join('.*')}`, 'i');
    return this.chats.filter(chat =>
      regex.test(`${chat.name} ${chat.surname}`)
    );
  }
}
