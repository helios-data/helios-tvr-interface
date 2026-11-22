import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.sources.fake import fake_data_stream

app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    print("Client connected")
    try:
        async for message in fake_data_stream():
            await websocket.send_json(message)
    except WebSocketDisconnect:
        print("Client disconnected")  # browser tab close