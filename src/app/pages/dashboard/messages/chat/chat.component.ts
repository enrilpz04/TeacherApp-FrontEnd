import { Component, Input } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser.interface';
import { IMessage } from '../../../../interfaces/imessage.interface';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() chat! : IMessage[]
  @Input() activeUser! : IUser
  @Input() userChat! : IUser

  get chatLength(): number {
    console.log(this.chat)
    return this.chat ? this.chat.length : 0;
  }
}
