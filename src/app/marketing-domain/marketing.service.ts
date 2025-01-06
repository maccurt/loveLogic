import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Marketing, SafetyMarketing_MOCK, SocialMedia } from './Marketing';
import { Business } from '../business-domain/Business';
@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  safety(): Observable<Marketing> {
    return of(SafetyMarketing_MOCK);
  }

  getBusinessSafety(business: Business): Marketing {
    const marketing: Marketing = { ...SafetyMarketing_MOCK };
    const fbIndex = marketing.bulletPointList.findIndex((b) => { return b.socialMedia === SocialMedia.facebook; });
    marketing.bulletPointList[fbIndex].url = business.facebookUrl;

    const direciontIndex = marketing.bulletPointList.findIndex((b) => { return b.socialMedia === SocialMedia.directions; });
    marketing.bulletPointList[direciontIndex].url = business.address.googleMapUrl;

    const websiteIndex = marketing.bulletPointList.findIndex((b) => { return b.socialMedia === SocialMedia.website; });
    marketing.bulletPointList[websiteIndex].url = business.url;

    const phoneNumber = marketing.bulletPointList.findIndex((b) => { return b.socialMedia === SocialMedia.phoneNumber; });
    marketing.bulletPointList[phoneNumber].url = business.address.phone;
    marketing.bulletPointList[phoneNumber].urlIsPhone = true;

    marketing.bulletPointInviteList = [];
    marketing.bulletPointInviteList.push(
      {
        title: 'Click To Copy Invite Link',      
        subTitle:'copy invite from your clipboard',
        icon: 'content_copy',
        socialMedia: SocialMedia.invite,
        route: business.urlInvite.value,
        isInvite: true
      });

    marketing.bulletPointMeetList = [];
    marketing.bulletPointMeetList.push(
      { title: "Let's see how we vibe.", icon: 'people', socialMedia: SocialMedia.unknown },
      { title: 'What Makes You Happy?', icon: 'insert_emoticon', socialMedia: SocialMedia.unknown },
    );

    return marketing;
  }

}
