import Message from "../models/message.model.js";

export class MessagesDao {
  async getAll() {
    return await Message.find();
  }

  async create(data) {
    return await Message.create(data);
  }
}
