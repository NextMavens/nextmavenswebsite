type TelegramMessage = {
  name?: string;
  email?: string;
  message: string;
  subject?: string;
  timestamp?: string;
};

const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

export const sendToTelegram = async (data: TelegramMessage) => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing');
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  // Format the message
  const formattedMessage = `
🔔 New Message from Website

${data.name ? `👤 Name: ${data.name}` : ''}
${data.email ? `📧 Email: ${data.email}` : ''}
${data.subject ? `📑 Subject: ${data.subject}` : ''}
💬 Message: ${data.message}
⏰ Time: ${data.timestamp || new Date().toLocaleString()}
  `.trim();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API Error: ${errorData.description || 'Unknown error'}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Helper function to test the connection
export const testTelegramConnection = async () => {
  try {
    const result = await sendToTelegram({
      message: '🔄 Test message - Website connection successful',
      timestamp: new Date().toLocaleString(),
    });
    return result;
  } catch (error) {
    console.error('Telegram connection test failed:', error);
    return { success: false, error: 'Connection test failed' };
  }
}; 