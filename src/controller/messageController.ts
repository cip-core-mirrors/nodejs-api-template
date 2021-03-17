import {getManager} from "typeorm";
import {Message} from '../entity/message'

export async function GetAllMessage() {

   const messageRepository = getManager().getRepository(Message)

   return messageRepository.find()
}

export async function AddMessage(message: string) {

    const messageRepository = getManager().getRepository(Message)

    const newMessage = messageRepository.create({name: message})

    await messageRepository.save(newMessage)

    return newMessage
}