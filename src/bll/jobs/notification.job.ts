import { RecurrenceRule, scheduleJob } from "node-schedule";
import INotificationJob from "./inotification.job";
import * as dayjs from 'dayjs';
import INotificationService from "../service/inotification.service";
import ILigaProPortingService from "../service/iligapro-porting.service";
export default class NotificationJob implements INotificationJob {
  private readonly _notificationService: INotificationService;
  private readonly _ligaProService: ILigaProPortingService;

  constructor(notificationService: INotificationService, ligaProService: ILigaProPortingService) {
    this._notificationService = notificationService;
    this._ligaProService = ligaProService;
  }

  start(): void {
    const rule = new RecurrenceRule();
    rule.hour = 10;

    scheduleJob("user-notification", rule, () => {
      this._ligaProService.import();
      this.notify();
    });
  }

  private async notify() {
    this._notificationService.notifyUsers(dayjs().subtract(10, 'day').unix());
  }
}
