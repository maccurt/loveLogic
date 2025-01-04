export class Marketing {
  title!: string;
  text!: string;
  bulletPointList!: MarketingBulletpoint[];
}

export class MarketingBulletpoint {
  title!: string
  icon!: string;
}

export const CanWeTalkMarketing_Mock: Marketing = {
  title: 'Can We Talk In Person?',
  text: 'Talking in person is more effective for dating than online messages and texting.',
  bulletPointList: [
    { title: 'Can We Meet?', icon: 'emoji_people' },
    { title: 'Can We Talk?', icon: 'people' },
    { title: 'Talk over a cocktail', icon: 'local_bar' },
    { title: 'A Quick Coffe Date To Vibe', icon: 'coffee' },
  ]
}

export const SafetyIsAPriority_MOCK: Marketing = {
  title: 'Your Safety Is A Priority',
  text: 'Talking in person is more effective for dating than online messages and texting.',
  bulletPointList: [
    { title: 'Facebook Group To Verify Location', icon: 'facebook' },
    { title: 'Google Map Directions', icon: 'directions' },
    { title: 'Website to verify business.', icon: 'public' },
    { title: 'Phone number to verify business', icon: 'phone' }
  ]
}

export const WeAreInBeta_Mock: Marketing = {
  title: 'We Are In Beta 1.0',
  text: 'Talking in person is more effective for dating than online messages and texting.',
  bulletPointList: [
    { title: 'Lorem ipsum dolor sit amet.', icon: 'money_off' },
    { title: 'Customer Focused', icon: 'groups' },
    { title: 'Security.', icon: 'security' },
    { title: 'Defect.', icon: 'bug_report' },
  ]
}

// export const MarketingInfoListMock: Marketing[] = [];

// export const SafetyIsPriorityListMock: MarketingBulletpoint[] = [
//   { title: 'Facebook Group To Verify Location', icon: 'facebook' },
//   { title: 'Google Map Directions', icon: 'directions' },
//   { title: 'Website to verify business.', icon: 'public' },
//   { title: 'Phone number to verify business', icon: 'phone' }
// ];
// export const ourProcessMarketingListMock: MarketingBulletpoint[] = [
//   { title: 'Lorem ipsum dolor sit amet.', icon: 'money_off' },
//   { title: 'Customer Focused', icon: 'groups' },
//   { title: 'Security.', icon: 'security' },
//   { title: 'Defect.', icon: 'bug_report' },
// ];



//export const brandNameMarketingListMock: MarketingBulletpoint[] = [

  // { title: 'Can We Meet?', icon: 'emoji_people' },
  // { title: 'Can We Talk?', icon: 'people' },
  // { title: 'Talk over a cocktail', icon: 'local_bar' },
  // { title: 'Coffee ipsum dolor sit amet.', icon: 'coffee' },
  // { title: 'people 1', icon: 'person_alt' },
  // { title: 'people 2', icon: 'people_outline' },
  // { title: 'people 3', icon: 'person_add' },
  // { title: 'people 4', icon: 'person_add_alt' },
  // { title: 'Wine ipsum dolor sit amet.', icon: 'wine_bar' },
  // { title: 'people 7', icon: 'woman' },
  // { title: 'people 7', icon: 'man' },
  // { title: 'people 7', icon: 'nightlife' },
  // { title: 'people 7', icon: 'accessibility_new' },
  // { title: 'people 7', icon: 'chair' },
  // { title: 'people 7', icon: 'xx' },
  // { title: 'Food', icon: 'brunch_dining' },
  // { title: 'Food 1', icon: 'wine_bar' },
  // { title: 'Food 2', icon: 'local_restaurant' },
  // { title: 'Food 3', icon: 'flatware' },
  // { title: 'Food 4', icon: 'free_breakfast' },

  // { title: 'Food 6', icon: 'local_cafe' },
  // { title: 'Food 8', icon: 'phone_iphone' },
  // { title: 'Food 9', icon: 'sentiment_very_satisfied' },
  // { title: 'Food 10', icon: 'sports_bar' },
  // { title: 'Food 11', icon: 'wc' },
  // { title: 'Food 12', icon: 'cake' },
  // { title: 'Food 13', icon: 'local_drink' },
  // { title: 'Food 14', icon: 'no_drinks' },


//];
