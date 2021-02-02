import {Chat} from "tdlib-types";

const {Client} = require('tdl')
const {TDLib} = require('tdl-tdlib-addon')

const client = new Client(new TDLib("lib/libtdjson.so"), {
    apiId: 0, // Your api_id
    apiHash: '', // Your api_hash
})

client.on('error', console.error)

async function main() {
    await client.connectAndLogin()

    const result = await client.invoke({
        _: 'getChats',
        offset_order: '9223372036854775807',
        offset_chat_id: 0,
        limit: 100
    })

    // latest 100 chats will be returned
    console.log(result)

    result.chat_ids.forEach((chatId: number) => {
        client.invoke({
            _: "getChat",
            chat_id: chatId
        }).then((chat: Chat) => console.log(chat.title))
    })
}

main()