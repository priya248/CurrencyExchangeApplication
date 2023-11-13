import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ExchangeService from 'src/services/exchange.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currencyType = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CHF', 'CNY', 'HKD', 'MXN', 'INR'];
  today =  new Date().toISOString().split('T')[0];
  mindate:any;
  min=  new Date();
  exchangeRateValue = 1;
  finalConversionValue: any;
  showResult:boolean=false;
  showError:boolean=false;
  exchangeForm: FormGroup = new FormGroup({
    amount: new FormControl('', [
      Validators.required]),
    date: new FormControl(this.today, [
      Validators.required]),
    fromCurrency: new FormControl('', [
      Validators.required]),
    toCurrency: new FormControl('', [
      Validators.required]),
  });

  constructor(private exchangeService: ExchangeService, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.min.setDate(this.min.getDate()-13);
    this.mindate= this.min.toISOString().split('T')[0]
  }
  onSubmit(form: FormGroup) {
    if(this.exchangeForm.valid){
      this.showError=false;
      this.showResult=false;
  
    let date = this.datePipe.transform(form.value.date, 'YYYY-MM-dd');
    let toCurrency = form.value.toCurrency;
    this.exchangeService.getCurrencyExchangeDate(date, form.value.fromCurrency, form.value.toCurrency).subscribe(data => {
      if(data){
      let response = data.results;
      this.exchangeRateValue = response[toCurrency];
      this.finalConversionValue = this.exchangeRateValue * form.value.amount;
      this.showResult=true;
      }
    });
  }
    else
    this.showError=true;
  }
  
}
