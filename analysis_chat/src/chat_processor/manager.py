import json

from analysis_chat.src.analysis.main import Analysis
from analysis_chat.src.events import Events
from analysis_chat.src.pub_sub.channels import Channels
from analysis_chat.src.pub_sub.nats_publisher import NatsPublisher

class Manager:
    def __init__(self, publisher: NatsPublisher, analysis: Analysis):
        self.publisher = publisher
        self.analysis = analysis
        self.handlers = {
            Events.CHAT_MESSAGE: self.handle_sentiment,
        }

    async def manage_message(self, message):
        subject = message.subject
        data = message.data.decode("utf-8")
        data = json.loads(data)
        strategy = self.handlers[subject]
        result = strategy(data)
        await self.publisher.publish(Channels.SENTIMENT_MESSAGE, json.dumps(result))

    def handle_sentiment(self, data):
        message = data['message']
        sentiment = self.analysis.analyze(message)
        return {
            "sentiment": sentiment,
            "messageId": data["messageId"]
        }
