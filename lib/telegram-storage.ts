import axios from 'axios';
import FormData from 'form-data';

export class TelegramStorage {
  private botToken: string;
  private chatId: string;

  constructor() {
    this.botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN!;
    this.chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!;
  }

  async uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('chat_id', this.chatId);

    try {
      const response = await axios.post(
        `https://api.telegram.org/bot${this.botToken}/sendDocument`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (!response.data.ok) {
        throw new Error('Failed to upload file to Telegram');
      }

      const fileId = response.data.result.document.file_id;
      
      // Get file path
      const fileInfo = await axios.get(
        `https://api.telegram.org/bot${this.botToken}/getFile`,
        {
          params: { file_id: fileId },
        }
      );

      if (!fileInfo.data.ok) {
        throw new Error('Failed to get file info from Telegram');
      }

      const filePath = fileInfo.data.result.file_path;
      return `https://api.telegram.org/file/bot${this.botToken}/${filePath}`;
    } catch (error) {
      console.error('Error uploading to Telegram:', error);
      throw new Error('Failed to upload file');
    }
  }

  async deleteFile(): Promise<boolean> {
    // Note: Telegram doesn't provide a direct way to delete files
    // This is a placeholder for future implementation
    console.warn('File deletion not implemented for Telegram storage');
    return true;
  }
}

export const telegramStorage = new TelegramStorage();

export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const urls: string[] = [];
  
  for (const file of files) {
    try {
      const url = await telegramStorage.uploadFile(file);
      urls.push(url);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }
  
  return urls;
};

export const deleteFile = async (): Promise<boolean> => {
  try {
    return await telegramStorage.deleteFile();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
