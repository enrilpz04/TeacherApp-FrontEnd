import { Component, inject } from '@angular/core';
import { ChatsListComponent } from './chats-list/chats-list.component';
import { IUser } from '../../../interfaces/iuser.interface';
import { MessagesService } from '../../../services/messages.service';
import { AuthService } from '../../../services/auth.service';
import { ChatComponent } from "./chat/chat.component";
import { IMessage } from '../../../interfaces/imessage.interface';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [ChatsListComponent, ChatComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  chats!: IUser[]
  user!: IUser
  selectedUser!: IUser
  selectedChat!: IMessage[];

  messagesService: MessagesService = inject(MessagesService)
  authService: AuthService = inject(AuthService)

  ngOnInit() {
    this.authService.getUser().subscribe(async user => {
      if (user) {
        this.user = user
        this.chats = await this.messagesService.getChatsByUser(user.id ? user.id : '');
      }
    })
  }

  async selectChat(event: any) {
    this.selectedUser = event
    const chat: IUser = event as IUser;
    this.selectedChat = await this.messagesService.getAllMessagesBetweenUsers(chat.id ? chat.id : '', this.user.id ? this.user.id : '');
  }
}
