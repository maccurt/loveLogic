import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Marketing, SafetyMarketing_MOCK, SocialMedia } from './Marketing';
import { Business } from '../business-domain/Business';
import { orderBy } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor() { }


  safety(): Observable<Marketing> {

    return of(SafetyMarketing_MOCK);

  }

  getBusinessSafety(business: Business): Marketing {    
    const marketing: Marketing = { ...SafetyMarketing_MOCK };
    //SORT TO make sure enums will work with proper index
    //TODO this is dangerous so, we need a UNIT TEST FOR THIS

    // marketing.bulletPointList.sort((a, b) => a.socialMedia - b.socialMedia);

    const fbIndex = marketing.bulletPointList.findIndex((b)=>{return b.socialMedia === SocialMedia.facebook})
    marketing.bulletPointList[fbIndex].url = business.facebookUrl;

    const direciontIndex = marketing.bulletPointList.findIndex((b)=>{return b.socialMedia === SocialMedia.directions})
    marketing.bulletPointList[direciontIndex].url = business.address.googleMapUrl;

    const websiteIndex = marketing.bulletPointList.findIndex((b)=>{return b.socialMedia === SocialMedia.website})
    marketing.bulletPointList[websiteIndex].url = business.url;

    const phoneNumber = marketing.bulletPointList.findIndex((b)=>{return b.socialMedia === SocialMedia.phoneNumber})
    marketing.bulletPointList[phoneNumber].url = business.address.phone;
    marketing.bulletPointList[phoneNumber].urlIsPhone = true;

    return marketing;
  }

}
