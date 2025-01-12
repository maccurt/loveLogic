import { Component, inject, input, model, OnInit, signal } from '@angular/core';
import { Business } from '../business-domain/Business';
import { BusinessComponent } from "../business-domain/business/business.component";
import { BulletPointListComponent } from "../marketing-domain/bullet-point-list/bullet-point-list.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarketingStore } from '../marketing-domain/marketing.store';
import { Message } from './Message';
import { getFieldsFromParamMap } from './getFieldsFromParamMap.function';

@Component({
  selector: 'll-invite',
  imports: [
    BusinessComponent,
    BulletPointListComponent,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './invite.component.html',
  styleUrl: './invite.component.scss'
})
export class InviteComponent implements OnInit {
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

  //label,etc
  step2Title = 'Copy Invite Link & Send To Recipient';
  inviteMessage = signal<Message | undefined>(undefined);

  ngOnInit(): void {

    this.messageList.push(
      { id: 1, text: `I would like to invite you to the <span> ${this.business().name} </span> to meet to see if our personality matches.` },
      { id: 2, text: ` ${this.business().name} is a place I enjoy and I would like to invite you to accompany me. ` },
    );

    this.route.queryParamMap.subscribe(this.setParmsQueryParamMap);
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
  return messageList[0];
};