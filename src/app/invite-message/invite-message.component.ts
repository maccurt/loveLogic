import { Component, input } from '@angular/core';
import { Message } from '../invite/Message';

@Component({
  selector: 'll-invite-message',
  imports: [],
  templateUrl: './invite-message.component.html',
  styleUrl: './invite-message.component.scss'
})
export class InviteMessageComponent {

  message = input.required<Message>();

}
