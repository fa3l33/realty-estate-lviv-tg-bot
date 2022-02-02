export default interface INotificationService {
    notifyUsers(startFilterDate: number) : Promise<void>;   
    notifyUser(startFilterDate: number, userId: number) : Promise<void>;
}