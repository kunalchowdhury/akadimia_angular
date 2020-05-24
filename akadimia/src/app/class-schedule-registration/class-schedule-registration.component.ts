import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {parse, parseISO} from 'date-fns';
import {environment} from "../../environments/environment";
import {OWL_DATE_TIME_FORMATS} from "ng-pick-datetime";


interface Subject {
  name: string;
  viewValue: string;
}


export const MY_CUSTOM_FORMATS = {
  parseInput: 'dd/MM/yyyy, HH:mm:ss',
  fullPickerInput: 'dd/MM/yyyy, HH:mm:ss',
  datePickerInput: 'dd/MM/yyyy , HH:mm:ss',
  timePickerInput: 'dd/MM/yyyy , HH:mm:ss',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY',
};

@Component({
  selector: 'app-class-schedule-registration',
  templateUrl: './class-schedule-registration.component.html',
  styleUrls: ['./class-schedule-registration.component.css'],
  providers: [

    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS},
  ]
})
export class ClassScheduleRegistrationComponent implements OnInit {
  private latitude: number;
  private longitude: number;
  private area: string;
  public todayDate:any = new Date();
  constructor(private route: ActivatedRoute, private router:Router,  private http: HttpClient) { }

  subjects: Subject[] = [
    {name: 'Biology', viewValue: 'Biology'},
    {name: 'Mathematics', viewValue: 'Mathematics'},
    {name: 'StoryTelling', viewValue: 'StoryTelling'},
    {name: 'Physics', viewValue: 'Physics'},
    {name: 'Hindi', viewValue: 'Hindi'},
    {name: 'English', viewValue: 'English'}
  ];
  urldesc: string;
  userId : string;
  dateTime: any;
  toDateTime: Date;
  fromDateTime: Date;
  selectedSubject: String;

  dateFormat = 'dd/MM/yyyy, HH:mm:ss';

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  ngOnInit() {
    let myId =this.route.snapshot.paramMap.get('id');


    //alert("My Id is "+myId);
    this.http.get("https://"+environment.hostname+":7002/userMailId/"+myId,

      {headers: this.headers, responseType: 'text'}).subscribe(data => {
       // alert("Your User Id "+JSON.stringify(data));
        this.userId = data;
      },

      error => {
        alert("You are not a registered user .Please register first.");
        console.log('Log the error here: ', error);
      });


  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.area = result.formatted_address;
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    //alert(this.latitude+","+this.longitude);
  }

  goBack() {
    let myId =this.route.snapshot.paramMap.get('id');
    this.router.navigate(['social-media-landing', myId], { skipLocationChange: true});
  }

  submitForm() {
    let valid: boolean = true;
    if(!this.selectedSubject){
      alert("Select Subject");
      valid =false;
    }
    if(!this.fromDateTime){
      alert("Select From Date Time");
      valid = false;
    }

    if(!this.toDateTime){
      alert("Select To Date Time");
      valid = false;
    }

    if(!this.area){
      alert("Select Locality");
      valid = false;
    }

    if(!this.urldesc){
      alert("Select Sample Video");
      valid = false;
    }

    if(this.fromDateTime.getTime() > this.toDateTime.getTime()){
      alert("From Date is greater than To Date");
      valid = false;
    }

    if(this.toDateTime.getTime() - this.fromDateTime.getTime() >= 10*60*60*1000){
      alert("Max class duration should be less than 10 hours");
      valid = false;
    }

    if(!valid){
      return;
    }

   // alert(this.fromDateTime.toLocaleString());
   // let fromDateLocale = parse(this.fromDateTime.toLocaleString(), 'dd/MM/yyyy, HH:mm:ss', new Date());
   // alert(fromDateLocale.toLocaleString().replace('Z',''));
   // alert(fromDateLocale.toISOString().replace('Z',''));
   // let fromDate = parseISO(fromDateLocale.toISOString().replace('Z',''));


  //  alert(this.toDateTime.toLocaleString());
    //let toDateLocale = parse(this.toDateTime.toLocaleString(), 'dd/MM/yyyy, HH:mm:ss', new Date());
  //  alert(toDateLocale.toLocaleString().replace('Z',''));
  //  alert(toDateLocale.toISOString().replace('Z',''));
  //  let toDate = parseISO(toDateLocale.toISOString().replace('Z',''));

    let url = "https://"+environment.hostname+":7003/sessionc/?subject="+this.selectedSubject+
      "&fromDate=" +this.fromDateTime.getTime()+
      "&toDate="+this.toDateTime.getTime()+
      "&userId="+this.userId+
      "&area="+this.area+
      "&lat="+this.latitude+
      "&lon="+this.longitude+
      "&youTubeURL="+this.urldesc;

   // alert("submitting form for user >> "+url);
    this.http.get(url,

      {headers: this.headers, responseType: 'text'}).subscribe(data => {
        let myId =this.route.snapshot.paramMap.get('id');
        this.router.navigate(['social-media-landing', myId], { skipLocationChange: true });
        alert("Session saved. You will receive an email at "+myId);

      },

      error => {
        alert("Error- please check if you have already registered for the slot." + JSON.stringify(error));
        let myId =this.route.snapshot.paramMap.get('id');
        this.router.navigate(['social-media-landing', myId], { skipLocationChange: true});
        console.log('Log the error here: ', error);
      });




  }
}
