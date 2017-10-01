export default class ChatMessageModel {
    constructor(userName, imageUrl, time, message){
        this.userName = userName;
        this.imageUrl = imageUrl;
        this.time = time;
        this.message = message;
    }
}