export class Marketing {
  title!: string;
  text!: string;
  bulletPointList!: MarketingBulletpoint[];
  bulletPointInviteList?: MarketingBulletpoint[];
  bulletPointMeetList?: MarketingBulletpoint[];
}

export enum SocialMedia {
  facebook = 0,
  website,
  phoneNumber,
  google,
  directions,
  route,
  invite,
  unknown = 999
}
export const PhoneNumberSocialMedia_enum = SocialMedia.phoneNumber;

export class MarketingBulletpoint {
  title!: string;
  subTitle?: string;
  icon!: string;
  iconCssStyle?: string = 'color:green !important;';
  socialMedia: SocialMedia = SocialMedia.unknown;
  url?: string;
  urlIsPhone?: boolean;
  isInvite?: boolean;
  route?: string;
}

export const CanWeTalkMarketing_Mock: Marketing = {
  title: 'Can We Talk In Person?',
  text: 'Talking in person is more effective for dating than online messages and texting.',
  bulletPointList: [
    { title: "Let's see how we vibe.", icon: 'people', socialMedia: SocialMedia.unknown },
    { title: 'We Can Get A Cocktail.', icon: 'local_bar', socialMedia: SocialMedia.unknown },
    { title: "Let's grab a coffee.", icon: 'coffee', socialMedia: SocialMedia.unknown },
    { title: 'What Makes You Happy?', icon: 'insert_emoticon', socialMedia: SocialMedia.unknown },
  ]
};

export const SafetyMarketing_MOCK: Marketing = {
  title: 'Your Safety Is A Priority.',
  text: 'We give you well known tools to verify the safety of a location.',
  bulletPointList: [
    { title: 'Facebook Group Verify', icon: 'facebook', socialMedia: SocialMedia.facebook },
    { title: 'Google Map Directions', icon: 'directions', socialMedia: SocialMedia.directions },
    { title: 'Main Website verify.', icon: 'public', socialMedia: SocialMedia.website },
    { title: 'Phone number verify', icon: 'phone', socialMedia: SocialMedia.phoneNumber }
  ]
};

export const WeAreInBeta_Mock: Marketing = {
  title: 'We Need Your Constructive Feedback!',
  text: 'This is not about money! This is about having an experience.',
  bulletPointList: [
    { title: 'No Bull $**t Subscription', icon: 'emoji_emotions', socialMedia: SocialMedia.unknown },
    { title: 'Customer Focused', icon: 'groups', socialMedia: SocialMedia.unknown },
    { title: 'Data Driven.', icon: 'pie_chart', socialMedia: SocialMedia.unknown },
    { title: 'Warts & All.', icon: 'bug_report', socialMedia: SocialMedia.unknown },
  ]
};

