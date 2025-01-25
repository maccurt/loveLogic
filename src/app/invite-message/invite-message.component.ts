import { Component, input } from '@angular/core';
import { Message } from '../invite/Message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'll-invite-message',
  imports: [CommonModule],
  templateUrl: './invite-message.component.html',
  styleUrl: './invite-message.component.scss'
})
export class InviteMessageComponent {
  isSelection = input<boolean>(false);
  message = input.required<Message>();

}
