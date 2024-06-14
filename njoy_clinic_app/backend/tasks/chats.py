from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f'chat_{self.user_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        # Log de conexión exitosa
        print(f"Cliente conectado: {self.user_id}")

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        # Log de desconexión
        print(f"Cliente desconectado: {self.user_id}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = await self.save_message(data)
        print(f"Mensaje recibido en el servidor: {message}")

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
            }
        )

    async def chat_message(self, event):
        message = event['message']
        print(f"Mensaje enviado desde el servidor: {message}")

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': {
                'id': message.id,
                'usuarioEmisor': message.usuarioEmisor.id,
                'usuarioReceptor': message.usuarioReceptor.id,
                'content': message.contenido,
                'created_at': message.created_at.strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            }
        }))

    async def save_message(self, data):
        usuarioEmisor = data['usuarioEmisor']
        usuarioReceptor = data['usuarioReceptor']
        contenido = data['contenido']

        # Guardar el mensaje en la base de datos
        message = Message(
            usuarioEmisor=usuarioEmisor,
            usuarioReceptor=usuarioReceptor,
            contenido=contenido,
        )
        await message.save()