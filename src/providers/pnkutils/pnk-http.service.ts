import {Injectable} from '@angular/core';
import {Http, Response, Headers, Jsonp} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {AppUtils} from '../apputils/apputils';

@Injectable()

export class PnkHttpService {
  public curUrl: string = window.location.href;
  public ServerUrl: string;
  public timest: number = Math.round(new Date().getTime());
  public token: string = null;
  public ServicesUrl: string;
  private AppSecretKey = "";
  public HttpRequestDone:boolean = true;
  public AssetsUrl:string = "http://exchange.finelogix.com/";

  constructor(private http: Http, private jsonp: Jsonp, private appUtils: AppUtils) {
    //this.AssetsUrl = " http://ilhaus.com/dev/valuebit/";
    this.ServerUrl = "";
    /*****Live ForAppBuild*/
    // this.ServerUrl = 'http://ilhaus.com/dev/valuebit/'//Uncomment for live
   this.ServerUrl = "http://exchange.finelogix.com/"; 
   this.ServicesUrl = this.ServerUrl+"api/app/"; // uncomment for Live N dont forget to remove proxy form ionic config

    /****Local */
    //this.ServerUrl = "http://exchange.finelogix.com/"; //Uncomment for live
    // this.ServerUrl = "http://192.168.1.37/laravel/valuebit-new/api/app/";   
    // this.ServicesUrl = this.ServerUrl+"api/";  ///uncomment for local server and local browser

    this.appUtils.SetServerUrl(this.AssetsUrl);
  }

  CreateAuthorizationHeader(headers: Headers) {
    headers.append('X-CallBack-Type', 'AJAXGET');
    headers.append('X-Project-Type', 'APP');
    headers.append('X-Secret-Key', 'abc01');
    headers.append('XAUTHTOKEN', this.token);
  }

  CreateAuthorizationHeaderForRawLogin(headers: Headers) {
    headers.append('X-CallBack-Type', 'AJAXGET');
    headers.append('X-Project-Type', 'APP');
    headers.append('X-Secret-Key', 'abc01');
  }


  GetAjax(url: string, paramString: string): Observable<any> {

    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url;

    else
      url = this.ServicesUrl + url + "?" + paramString;      
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  GetAjaxFromServer(url: string, paramString: string): Observable<any> {

    var commData = "t=" + Math.round(new Date().getTime());
    let headers = new Headers();
    this.CreateAuthorizationHeader(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url + "?" + commData;

    else
      url = this.ServicesUrl + url + "?" + paramString + "&" + commData;
    return this.http.get(url, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  GetAjaxFromServerWithoutAuth(url: string, paramString: string): Observable<any> {

    var commData = "t=" + Math.round(new Date().getTime());
    let headers = new Headers();
    this.CreateAuthorizationHeaderForRawLogin(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url;

    else
      url = this.ServicesUrl + url + "?" + paramString;
    return this.http.get(url, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  PostSynchronousAjaxFromServer(url: string, paramString: any): Observable<any> {
    let headers = new Headers();
    this.CreateAuthorizationHeader(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url;
    else
      url = this.ServicesUrl + url;
    return this.http.post(url, {"requestData": paramString}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  PostSynchronousAjaxFromServerForRawLogin(url:string, paramString:any): Observable<any> {

    let headers = new Headers();
    this.CreateAuthorizationHeaderForRawLogin(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url;
    else
      url = this.ServicesUrl + url;
    return this.http.post(url, { "requestData": paramString }, {headers: headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  PostSynchronousAjaxFromServerWithoutAuth(url: string, paramString: any): Observable<any> {

    let headers = new Headers();
    this.CreateAuthorizationHeaderForRawLogin(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url;
    else
      url = this.ServicesUrl + url;
    return this.http.post(url, {"requestData": paramString}, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  PutSynchronousAjaxFromServer(url: string, paramString: any): Observable<any> {
    var commData = "t=" + Math.round(new Date().getTime());
    let headers = new Headers();
    this.CreateAuthorizationHeader(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url + "?" + commData;
    else
      url = this.ServicesUrl + url + "?" + commData;
    return this.http.put(url, {"requestData": paramString},{ headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  DeleteSynchronousAjaxFromServer(url: string, paramString: string): Observable<any> {
    var commData = "&t=" + Math.round(new Date().getTime());
    let headers = new Headers();
    this.CreateAuthorizationHeader(headers);
    if ((paramString == null) || (paramString == "") || (paramString == undefined))
      url = this.ServicesUrl + url + "?" + commData;

    else
      url = this.ServicesUrl + url + "?" + commData;
    return this.http.delete(url, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }
  public extractData(res: Response) {
    let resp:any;
    resp = res;
    resp = resp._body.replace(/<script.*?>.*?<\/script>/igm,'');
    let body = JSON.parse(resp);
    return body;
  }

  public handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  ParseError = function () {
  };
  HandlePinakaError = function (pinakaResp: any) {
      console.log("Pinaka Error: Oops! Something went wrong. Please try again later");
  };

  GetJsonpFromHttp(url: string): Observable<any[]> {
    return this.http.get(url)
      .map(function (res) {
        let body = res.json();
        return body;
      })
      .catch(this.handleError);
  }

  GetJsonp(url: string): Observable<any[]> {
    return this.jsonp.get(url)
      .map(response => response.json()[1]).catch(function (error: any) {
        return Observable.throw(error);
      });
  }
}
