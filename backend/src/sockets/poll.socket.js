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

      socket.on(
        "join_poll",
        (pollId) => {

          socket.join(
            pollId
          )

          console.log(
            `Joined poll room: ${pollId}`
          )

        }
      )

      // DISCONNECT

      socket.on(
        "disconnect",
        () => {

          console.log(
            "User disconnected:",
            socket.id
          )

        }
      )

    }
  )

}

export default pollSocket