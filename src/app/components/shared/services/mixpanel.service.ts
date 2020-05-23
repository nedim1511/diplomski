import { Injectable } from "@angular/core";
import * as mixpanel from "mixpanel-browser";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class MixpanelService {
  constructor(private cookieService: CookieService) {}

  /**
   * Generate a unique uuid and store it in cookies
   * Taken solution from: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid/8809472#8809472 on 23 May 2020
   */
  generateUserUuidAndStoreToCookies() {
    let d = new Date().getTime();
    let d2 = (performance && performance.now && performance.now() * 1000) || 0;
    this.cookieService.set(
      "uuid",
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;
        if (d > 0) {
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }),
    );
  }

  /**
   * Initialize mixpanel.
   *
   * @param {string} userToken
   * @memberof MixpanelService
   */
  init(userToken: string): void {
    mixpanel.init("c8d80cc07a9e5ca34338b4e601fdd3f7");
    mixpanel.identify(userToken);
  }

  /**
   * Push new action to mixpanel.
   *
   * @param {string} id Name of the action to track.
   * @param {*} [action={}] Actions object with custom properties.
   * @memberof MixpanelService
   */
  track(id: string, action: any = {}): void {
    mixpanel.track(id, action);
  }
}
