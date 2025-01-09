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

  getBusinessMarketing(business: Business, isCreateInvite = true): Marketing {

    const marketing: Marketing = (JSON.parse(JSON.stringify(SafetyMarketing_MOCK)));

    //TODO what if business has no fb group,etc
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
    if (isCreateInvite) {

      marketing.bulletPointInviteList.push(
        {
          title: 'Click To Copy Invite Link', subTitle: 'Copy invite from your clipboard', icon: 'content_copy',
          socialMedia: SocialMedia.invite, route: business.urlInvite.value, isInvite: true
        },
        { title: "Send Link To Invite Via Text", icon: 'message', subTitle: 'Paste link into direct/tect message', subTitleShow: true, socialMedia: SocialMedia.unknown }
      );

    }

    marketing.bulletPointInviteList.push(

      { title: "Let's see how we vibe.", icon: 'people', socialMedia: SocialMedia.unknown },
      { title: 'What Makes You Happy?', icon: 'insert_emoticon', socialMedia: SocialMedia.unknown },
    );

    return marketing;
  }

}
