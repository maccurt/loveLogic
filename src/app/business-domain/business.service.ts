import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Business, stateListMock, StateLocation } from './Business';
import { Category } from "./categroryListMock";
import { categoryAll } from "./categroryListMock";
import { categroryListMock } from "./categroryListMock";
import countBy from 'lodash-es/countBy';
import { sortBy } from 'lodash-es';

export class Address {
  address1!: string;
  address2?: string;
  state!: string;
  city!: string;
  zipcode!: string;
  phone!: string;

}
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
          const state = stateListMock.find((s) => {
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

  businessList(stateCode: string): Observable<Business[]> {
    return this.http.get<Business[]>(this.url).pipe(
      map((result) => {

        const filter = result.filter((b) => {
          return b.address.state.toLocaleLowerCase() === stateCode.toLocaleLowerCase();
        });        

        filter.forEach((b) => {
          b.googleMapUrl = this.googleMapSearchUrl(b.name, b.address);

          b.urlAppSendTo = document.location.host + `/state/${b.address.state}/business/${b.id}`;


        });

        //Sort by name in future, add others
        return sortBy(filter, ['name']);
      })
    );
  }

  getCategoryListWithCount(businessList: Business[]): Category[] {

    const categoryCount = countBy(businessList, 'categoryId');
    let categoryList: Category[] = [];

    const all = categoryAll;
    all.count = businessList.length;

    for (const key in categoryCount) {

      const category = categroryListMock.find((c) => {
        return c.id === parseInt(key);
      });

      if (category) {
        category.count = categoryCount[key];
        categoryList.push(category);


        //TODO re-factor or remove
        //If there is no category url use the image from a business in that category
        if (!category.imageUrl) {
          const b = businessList.find((b) => {
            return b.categoryId === category.id;
          });

          category.imageUrl = b?.imageUrl;
        }

      }
      // else {
      //   //TODO fix error
      //   const buinessWithNoCategory = businessList.filter((b) => {
      //     return b.categoryId === parseInt(key);
      //   });       
      // }
    }

    //order by name
    categoryList = sortBy(categoryList, 'name');
    categoryList.unshift(all);
    return categoryList;
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
