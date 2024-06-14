import asyncio
import websockets
import uuid
import json

clients = {}

async def chat_server(websocket, path):
    client_id = str(uuid.uuid4())  # Genera un ID único para cada cliente
    clients[websocket] = client_id
    print(f"Nuevo cliente conectado con ID {client_id}: {websocket}")

    try:
        async for message in websocket:
            print(f"Mensaje recibido de {client_id}: {message}")
            message_data = json.loads(message)
            message_data['sender_id'] = client_id  # Añade el sender_id al mensaje
            await broadcast(json.dumps(message_data), websocket)
    except websockets.exceptions.ConnectionClosed:
        print(f"Cliente desconectado con ID {client_id}: {websocket}")
    finally:
        del clients[websocket]
        print(f"Cliente removido con ID {client_id}: {websocket}")

async def broadcast(message, sender):
    for client in clients:
        if client != sender:
            await client.send(message)

async def main():
    async with websockets.serve(chat_server, "0.0.0.0", 8080):
        print(f"Servidor WebSocket establecido en ws://0.0.0.0:8080")
        await asyncio.Future()  # Mantener el servidor en ejecución

if __name__ == "__main__":
    asyncio.run(main())
