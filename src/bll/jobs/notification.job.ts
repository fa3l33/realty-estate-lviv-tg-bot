import { Range, RecurrenceRule, scheduleJob } from "node-schedule";
import INotificationJob from "./inotification.job";
import * as dayjs from 'dayjs';
import INotificationService from "../service/inotification.service";
export default class NotificationJob implements INotificationJob {
  private readonly _notificationService: INotificationService;

  constructor(notificationService: INotificationService) {
    this._notificationService = notificationService;
  }

  start(): void {
    const rule = new RecurrenceRule();
    rule.minute = [0, new Range(0, 59, 1)];

    scheduleJob("user-notification", rule, () =>
      this.notify()
    );
  }

  private async notify() {
    this._notificationService.notifyUsers(dayjs('2020-01-02').subtract(1, 'day').unix());
  }
}
