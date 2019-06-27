import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpModule, JsonpModule} from '@angular/http';

import {PnkHttpService} from '../providers/pnkutils/pnk-http.service';
import {AuthenticateProvider} from '../providers/authenticate/authenticate';
import {AppUtils} from '../providers/apputils/apputils';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LoginComponent} from "../components/login/login";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {CryptoCurrencyPage} from "../pages/crypto-currency/crypto-currency";
import {FiatCurrencyPage} from "../pages/fiat-currency/fiat-currency";
import {FiatDashboardComponent} from "../components/fiatCurrency/fiat-dashboard/fiat-dashboard";
import {FiatDepositComponent} from "../components/fiatCurrency/fiat-deposit/fiat-deposit";
import {FiatWithdrawalComponent} from "../components/fiatCurrency/fiat-withdrawal/fiat-withdrawal";
import {CryptoCurrencyBuyComponent} from "../components/cryptoCurrency/crypto-currency-buy/crypto-currency-buy";
import {CryptoCurrencyHistoryComponent} from "../components/cryptoCurrency/crypto-currency-history/crypto-currency-history";
import {CryptoCurrencySendComponent} from "../components/cryptoCurrency/crypto-currency-send/crypto-currency-send";
import {CryptoCurrencySellComponent} from "../components/cryptoCurrency/crypto-currency-sell/crypto-currency-sell";
import {CareerComponent} from "../components/staticPages/career/career";
import {ContactusComponent} from "../components/staticPages/contactus/contactus";
import {HowitworksComponent} from "../components/staticPages/howitworks/howitworks";
import {SupportComponent} from "../components/staticPages/support/support";
import {ProfileComponent} from "../components/staticPages/profile/profile";
import {WalletPage} from "../pages/wallet/wallet";
import {FiatNavigationPage} from '../pages/fiat-navigation/fiat-navigation';
import {CoinStatusComponent} from '../components/coin-status/coin-status';
import {TwoStepVerificationComponent} from '../components/two-step-verification/two-step-verification';
import {IntroductionPage} from '../pages/introduction/introduction';
import {GooglePlus} from '@ionic-native/google-plus';
import {CryptoCurrencyDashboardComponent} from '../components/cryptoCurrency/crypto-currency-dashboard/crypto-currency-dashboard';
import {File} from '@ionic-native/file';
import {Transfer} from '@ionic-native/transfer';
import {FilePath} from '@ionic-native/file-path';
import {Camera} from '@ionic-native/camera';
import {SignupComponent} from '../components/signup/signup';
import {SpinnerComponent} from '../components/spinner/spinner';
import {VerifyPinComponent} from '../components/verify-pin/verify-pin';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastController} from 'ionic-angular';
import {ModalComponent} from '../components/modal/modal';
import {TwoSfComponent} from "../components/two-sf/two-sf";
import {BankDetailsComponent} from "../components/bank-details/bank-details";
import {KycDetailsComponent} from "../components/kyc-details/kyc-details";
import {EntrypagePage} from '../pages/entrypage/entrypage';
import {SplashPage} from "../pages/splash/splash";
import {GeneralProvider} from '../providers/general/general';
import {HttpClientModule} from "@angular/common/http";
import {KeyValuePipe} from "../pipes/key-value/key-value";
import {CurrencyaddressPage} from '../pages/currencyaddress/currencyaddress';
import {FiatHistoryComponent} from "../components/fiatCurrency/fiat-history/fiat-history";
import { CryptocurrencyProvider } from '../providers/cryptocurrency/cryptocurrency';
import { FiatProvider } from '../providers/fiat/fiat';
import { CryptoCurrencyExchangeComponent } from '../components/cryptoCurrency/crypto-currency-exchange/crypto-currency-exchange';
import { CopycurrencyaddressmodalComponent } from '../components/copycurrencyaddressmodal/copycurrencyaddressmodal';
import { Clipboard } from '@ionic-native/clipboard';
import { CurrencytradegraphComponent } from '../components/currencytradegraph/currencytradegraph';
import { SettingsPage } from '../pages/settings/settings';
import { ChangepinComponent } from '../components/changepin/changepin';
import { ChartComponent } from '../components/chart/chart';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DashboardPage,
    WalletPage,
    ModalComponent,
    TwoSfComponent,
    EntrypagePage,
    SplashPage,

    KycDetailsComponent,
    BankDetailsComponent,

    CoinStatusComponent,
    IntroductionPage,
    TwoStepVerificationComponent,
    SignupComponent,
    SpinnerComponent,
    VerifyPinComponent,

    LoginComponent,
    CareerComponent,
    ContactusComponent,
    HowitworksComponent,
    SupportComponent,
    ProfileComponent,

    FiatCurrencyPage,
    FiatNavigationPage,
    FiatDashboardComponent,
    FiatDepositComponent,
    FiatWithdrawalComponent,
    FiatHistoryComponent,

    CryptoCurrencyPage,
    CryptoCurrencyDashboardComponent,
    CryptoCurrencyBuyComponent,
    CryptoCurrencySellComponent,
    CryptoCurrencySendComponent,
    CryptoCurrencyHistoryComponent,
    CryptoCurrencyExchangeComponent,
    KeyValuePipe,

    CurrencyaddressPage,
    CopycurrencyaddressmodalComponent,
    CurrencytradegraphComponent,
    SettingsPage,
    ChangepinComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule, JsonpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WalletPage,
    DashboardPage,
    ModalComponent,
    TwoSfComponent,
    EntrypagePage,
    SplashPage,

    KycDetailsComponent,
    BankDetailsComponent,

    CoinStatusComponent,
    IntroductionPage,
    TwoStepVerificationComponent,
    SignupComponent,
    SpinnerComponent,
    VerifyPinComponent,

    LoginComponent,
    CareerComponent,
    ContactusComponent,
    HowitworksComponent,
    SupportComponent,
    ProfileComponent,

    FiatCurrencyPage,
    FiatNavigationPage,
    FiatDashboardComponent,
    FiatDepositComponent,
    FiatWithdrawalComponent,
    FiatHistoryComponent,
    
    CryptoCurrencyPage,
    CryptoCurrencyDashboardComponent,
    CryptoCurrencyBuyComponent,
    CryptoCurrencySellComponent,
    CryptoCurrencySendComponent,
    CryptoCurrencyHistoryComponent,
    CryptoCurrencyExchangeComponent,

    CurrencyaddressPage,
    CopycurrencyaddressmodalComponent,
    CurrencytradegraphComponent,
    SettingsPage,
    ChangepinComponent,
    ChartComponent,
  ],
  providers: [
    HttpClientModule,
    StatusBar,
    SplashScreen,
    GooglePlus,
    File,
    Transfer,
    Camera,
    FilePath,
    PnkHttpService,
    AppUtils, ToastController,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticateProvider,
    GeneralProvider,
    CryptocurrencyProvider,
    FiatProvider,
    Clipboard
  ]
})
export class AppModule {
}
