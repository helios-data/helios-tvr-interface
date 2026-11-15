import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect

app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    counter = 0 #starts at 0 when client connect
    try:
        while True:
            await websocket.send_json({"message_number": counter})
            counter += 1
            await asyncio.sleep(1) #wait for 1s 
    except WebSocketDisconnect:
        print("Client disconnected")  # browser tab closed
