(async () => {
  const Message = require('../models/messages')

  await Message.init()

  console.log("done")
  return
})()