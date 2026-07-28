export declare class TelegramService {
    private readonly logger;
    private readonly botToken;
    sendMessage(chatId: string, text: string): Promise<void>;
}
