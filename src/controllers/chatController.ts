import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Chat,{ChatDocument, SingleChat} from '../model/chatModel';


export const createChat = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        console.log("User Id not sent");
        res.send(400);
        return
    }
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: res.locals.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
        .populate("users", "-password")
        .populate("latestMessage")
        .populate({
            model:"User",
            path: "latestMessage.sender",
            select: "name pic email",
            });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData:SingleChat = {
        chatName: "sender",
        isGroupChat: false,
        users: [res.locals.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
})

export const getChats = asyncHandler(async (req: Request, res: Response) => {
    try {
        const data = await Chat.find({
          users: { $elemMatch: { $eq: res.locals.user._id } },
        })
          .populate("users", "-password")
          .populate("groupAdmin", "-password")
          .populate("latestMessage")
          .sort({ updatedAt: -1 })
        //   .populate({
        //     model: "User",
        //     path: "latestMessage.sender",
        //     select: "name pic email",
        //   });
        res.send(data)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const createGroupChat = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.users || !req.body.name) {
    res.status(400).send({message:"Please Fill up all fields"})
  }
  const users = JSON.parse(req.body.users)
  if (users.length < 2) {
    res.status(400).send("Please at least 3 users for group chat")
  }
  users.push(res.locals.user)
  try {
    const groupChat:ChatDocument = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: res.locals.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat)
    
  } catch (error) {
    res.status(400);
    throw new Error(error.message)
  }
})

export const renameGroup = asyncHandler(async (req:Request, res:Response) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(updatedChat);
  }
});


export const removeFromGroup = asyncHandler(async (req:Request, res:Response) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

export const addToGroup = asyncHandler(async (req:Request, res:Response) => {
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const added:ChatDocument = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(added);
  }
});