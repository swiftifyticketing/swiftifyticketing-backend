export const global = (io: any) => {
    io.on("connection", (socket: any) => {
        socket.on("refresh", () => {
            // Empty brackt at end can be replaced by something to be returned to fronend
            io.emit("refreshPage", {});
        });
    });
};
