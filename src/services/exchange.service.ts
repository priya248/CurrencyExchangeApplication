import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environment/environment';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export default class ExchangeService {

  exchangerateURL= environment.exchangerateURL;
  accessKey= environment.accessKey;

  constructor(private httpclient:HttpClient) { 
  }
  getCurrencyExchangeDate(date:any,baseCurrency:string,toCurrency:string){
    return this.httpclient.get<any>(this.exchangerateURL+`date=`+date+ `&from=`+baseCurrency+`&to=` + [toCurrency]+`&api_key=`+this.accessKey)
    .pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error(error));
      })); 
    
  }
}
