import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UIModule } from "./ui/ui.module";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CoreModule } from "./core/core.module";
import { NavigationComponent } from "./header/navigation/navigation.component";
import { ProfileMiniatureComponent } from './header/profile-miniature/profile-miniature.component';
import { AuthService } from "./auth/auth.service";
import { AuthFakeService } from "./auth/auth.fake.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavigationComponent,
    ProfileMiniatureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiNotificationsModule,

    UIModule,
    CoreModule,
],
  providers: [
    {
      provide: TUI_SANITIZER,
      useClass: NgDompurifySanitizer
    },
    {
      provide: AuthService,
      useClass: AuthFakeService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
