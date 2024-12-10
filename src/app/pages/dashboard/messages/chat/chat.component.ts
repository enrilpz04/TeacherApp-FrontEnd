import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IUser } from '../../../../interfaces/iuser.interface';
import { IMessage } from '../../../../interfaces/imessage.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  @Input() chat! : IMessage[]
  @Input() activeUser! : IUser
  @Input() userChat! : IUser
  @Output() message = new EventEmitter<IMessage>;

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  messageText: string = "";

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage() {
    if (this.messageText === "") return;
    const message: IMessage = {
      text: this.messageText,
      date: new Date(),
      watched: false,
      sender: this.activeUser,
      recipient: this.userChat
    };
    this.chat.push(message); // Añadir el mensaje a la lista de mensajes
    this.message.emit(message);
    this.messageText = ""; // Limpiar el campo de entrada después de enviar el mensaje
  }

  get chatLength(): number {
    return this.chat ? this.chat.length : 0;
  }
}
