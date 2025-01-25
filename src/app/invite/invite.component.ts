import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarketingStore } from '../marketing-domain/marketing.store';
import { Message } from './Message';
import { getFieldsFromParamMap } from './getFieldsFromParamMap.function';
import { MatTabsModule } from '@angular/material/tabs';
import { InviteMessageComponent } from "../invite-message/invite-message.component";
import { MatRadioModule } from '@angular/material/radio';
import { BusinessStore } from '../business-domain/business.store';
import { JsonPipe } from '@angular/common';

export const No_Message: Message = { id: 0, text: `None: Show no message.`, hide: true };
@Component({
  selector: 'll-invite',
  providers: [],
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    BusinessComponent,
    BulletPointListComponent,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    InviteMessageComponent,
    MatRadioModule
  ],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent implements OnInit {
  readonly store = inject(BusinessStore);
  readonly marketingStore = inject(MarketingStore);
  readonly route = inject(ActivatedRoute);
  //input
  readonly business = input.required<Business>();
  readonly isCreateMode = model<boolean>(true);
  //misc
  readonly panelOpenState = signal(false);
  readonly safetyIsExpanded = signal(false);
  readonly messageList: Message[] = [];

  //form
  readonly fb = inject(FormBuilder);
  readonly form = this.fb.group(({
    messageId: this.fb.nonNullable.control<number>(1)
  }));
  //form

  //label,etc
  step2Title = 'Copy Invite Link & Send To Recipient';
  endMessage = signal<string>('Please use steps below to verify the location.');
  inviteMessage = signal<Message>(No_Message);

  ngOnInit(): void {
    this.messageList.push(
      { id: 1, text: `I would like to invite you to the <span class="business-name"> ${this.business().name} </span> to meet to see if our personality matches.` },
      { id: 2, text: ` ${this.business().name} is a place I enjoy and I would like to invite you to accompany me. ` },
      No_Message);

    this.route.queryParamMap.subscribe(this.setParmsQueryParamMap);

    this.form.controls.messageId.valueChanges.subscribe((messageId) => {
      this.store.setMessage(messageId);
    });
  }

  setParmsQueryParamMap = (paramMap: ParamMap) => {

    const parms = getFieldsFromParamMap(paramMap);
    this.safetyIsExpanded.set(parms.isSafeyPriority);

    if (parms.isInvite) {
      this.isCreateMode.set(false);
    }

    if (!this.isCreateMode()) {
      this.step2Title = 'Meet me at the ' + this.business().name;
    }

    const message = getInviteMessage(this.messageList, parms.messageId);
    this.inviteMessage.set(message);
  };
}

export const getInviteMessage = (messageList: Message[], messageId: number): Message => {
  const message = messageList.find((m) => { return m.id === messageId; });
  if (message) {
    return message;
  }
  return No_Message;
};