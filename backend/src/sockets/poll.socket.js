const pollSocket = (
  io
) => {

  io.on(
    "connection",
    (socket) => {

      console.log(
        "User connected:",
        socket.id
      )

      // JOIN POLL ROOM
      socket.on("join_poll", (pollId) => {
        if (pollId) {
          socket.join(pollId.toString())
        }
      })

      // LEAVE POLL ROOM
      socket.on("leave_poll", (pollId) => {
        if (pollId) {
          socket.leave(pollId.toString())
        }
      })

      // DISCONNECT
      socket.on("disconnect", () => {})

    }
  )

}

export default pollSocket