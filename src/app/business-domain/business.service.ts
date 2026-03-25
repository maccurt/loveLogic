import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Business, STATE_LIST_MOCK, StateLocation, Url } from './Business';
import countBy from 'lodash-es/countBy';
import { sortBy } from 'lodash-es';
import { Address } from '../address/Adress';

@Injectable({
  providedIn: 'root'

})
export class BusinessService {

  url = '/data/data.json';
  constructor(private readonly http: HttpClient) { }

  cityList(): Observable<StateLocation[]> {
    return of([]);
  }

  locationList(): Observable<StateLocation[]> {
    return this.http.get<Business[]>(this.url).pipe(
      map((result) => {

        const stateCountList = countBy(result, 'address.state');
        const locationList: StateLocation[] = [];
        for (const key in stateCountList) {
          const businessCount = stateCountList[key];
          const state = STATE_LIST_MOCK.find((s) => {
            return s.abbreviation.toLocaleLowerCase() == key.toLocaleLowerCase();
          });
          if (state) {
            locationList.push(state);
            state.businessCount = businessCount;
          }
        }
        return locationList;
      })
    );
  }

  setGoogleMapUrl = (b: Business) => {
    b.address.googleMapUrl = this.googleMapSearchUrl(b.name, b.address);
    const inviteUrl = new Url();
    b.urlInvite = inviteUrl;
    inviteUrl.description = document.location.host + `/${b.address.state}/${b.id}`;
    inviteUrl.value = inviteUrl.description;
    inviteUrl.icon = 'content_copy';
    inviteUrl.hint = 'click to send invite';
  };

  businessList(stateCode: string): Observable<Business[]> {
    return this.http.get<Business[]>(this.url).pipe(
      map((result) => {

        //TODO it seem for the demo we do to much here

        const filter = result.filter((b) => {
          return b.address.state.toLocaleLowerCase() === stateCode.toLocaleLowerCase();
        });

        filter.forEach((b) => {
          this.setGoogleMapUrl(b);
        });

        //Sort by name in future, add others
        return sortBy(filter, ['name']);
      })
    );
  }

  googleMapSearchUrl(name: string, address: Address): string {
    const addressList: string[] = [];
    addressList.push(encodeURI(name));
    addressList.push(encodeURI(address.address1));
    addressList.push(encodeURI(address.city));
    addressList.push(encodeURI(address.state));
    addressList.push(encodeURI(address.zipcode));
    const join = addressList.join('+');
    const url = 'https://www.google.com/maps/search/?api=1&query=' + join;
    return url;
  }

}
