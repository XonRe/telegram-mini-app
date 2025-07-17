from aiogram import Bot, Dispatcher, types, F
import json
from aiogram.filters import Command

from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

from aiogram.utils.keyboard import InlineKeyboardBuilder
from dotenv import load_dotenv
import asyncio
import os
# Токен вашего бота
load_dotenv()
BOT_TOKEN = os.getenv('telebot')

# Инициализация бота и диспетчера
bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

# Инлайн клавиатура с кнопкой WebApp
def get_inline_webapp_keyboard():
    builder = InlineKeyboardBuilder()
    builder.button(text="Открыть Маленький Мук", web_app=WebAppInfo(url="https://xonre.github.io/telegram-mini-app/")) 
    return builder.as_markup()

# Обработчик команды /start
@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    welcome_text = (
        "Привет! Я бот с мини-приложением.\n\n"
        "Ты можешь открыть мини-приложение с помощью кнопки."
    )
    await message.answer(welcome_text, reply_markup=get_inline_webapp_keyboard())
    

# Обработчик сообщений с web_app_data

@dp.message(F.content_type == "web_app_data")
async def handle_web_app_data(message: types.Message):
    try:
        data = json.loads(message.web_app_data.data)
        action = data.get('action')
        amount = data.get('amount')
        balance = data.get('balance')
        
        if action == 'win':
            response = f"🎉 Поздравляем! Вы выиграли {amount} ₽\nНовый баланс: {balance} ₽"
        elif action == 'lose':
            response = f"😢 К сожалению, вы проиграли {amount} ₽\nНовый баланс: {balance} ₽"
        elif action == 'cashout':
            response = f"🤑 Вы забрали {amount} ₽\nНовый баланс: {balance} ₽"
        else:
            response = f"Получены данные: {message.web_app_data.data}"
            
        await message.answer(response)
    except json.JSONDecodeError:
        await message.answer(f"Получены данные: {message.web_app_data.data}")

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())