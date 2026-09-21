import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HttpClientService } from './@services/http-client.service';


@Component({
  selector: 'app-root',
  imports: [],
  // RouterOutlet
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {

  title = 'weatherForecast';
  WantLocations!: any;
  chooseLocationName!: string;
  WantOption!: any;
  selectedOption!: any;
  timeDataOption!: any;
  realTime!:any;

  //這是38包的json資料
  // 38個區
  // WantTem!: number;
  // WantDew!: number;
  // WantRelHu!: number;
  // WantAppTem!: number;
  // WantComDes!: string;
  // WantBeaWind!: number;
  // WantWindDir!: string;
  // WantProOPrain!: number;
  // WantWs!: string;
  // WantDes!: string;



  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.httpClientService.getApi('https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065?Authorization=CWA-C62C82EB-20FD-4A6F-AECB-1AD32BD70CC1')
      // 訂閱:非同步等待資料 是用來等待api回應我res以後再去做處理
      // res是自己取名的區域變數 用來存取Api回應的內容 所有呼叫api資料的動作都要包在訂閱裡面
      .subscribe((res: any) => {
        console.log(res.records.Locations);
        for (let data of res.records.Locations) {
          console.log(data.Location);
          this.WantLocations = data.Location;
          // 移到html頁面開始印出來38包資料的內容 但我可以利用.key去指定我只要印出38包之中的區域名稱就好
          // 透過this.將我抓到的38包資料從區域變數變成全域變數
        }
      });
  }

  chooseLocation(WantLocation: any) {
    console.log(WantLocation);
    this.chooseLocationName = WantLocation.LocationName;
    this.WantOption = WantLocation.WeatherElement;
    // LocationName跟WeatherElement是同一層的key 為了不要浪費事件繫結得到的進度 預先多設一個全域變數將elementname也留下來
    this.selectedOption = null;
  }

  chooseOptions(WantOption: any) {
    console.log(WantOption);
    this.selectedOption = WantOption;
    this.timeDataOption = WantOption.Time;

    // ts後台中將所有的WeatherElement陣列都截流下來了 但使用者不知道這件事 他們只會看到我想給他看到的那一層資訊
    // 我將ts截流下來的整個陣列保留下來備用 然後從區域變數變成一個全域變數讓它可以有機會被我利用
  }



}

// !!重要因為這是要處理api資料所以訂閱的非同步等待資料非常重要
// !!我試著把所有內容都寫在訂閱的下層結構中

