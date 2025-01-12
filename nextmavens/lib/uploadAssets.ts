import fetch from 'node-fetch';
import FormData from 'form-data';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';

type AssetType = {
  filePath: string;
  fileName: string;
  caption?: string;
};

// Add Telegram API response types
type TelegramResponse = {
  ok: boolean;
  result?: {
    document: {
      file_id: string;
      file_unique_id: string;
      file_size: number;
      file_name: string;
    };
  };
  description?: string;
  error_code?: number;
};

export const uploadToTelegram = async (asset: AssetType) => {
  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    throw new Error('Telegram configuration is missing. Check your .env.local file.');
  }

  try {
    // Verify file exists and get its size
    const fileStats = await stat(asset.filePath);
    if (!fileStats.isFile()) {
      throw new Error(`Not a file: ${asset.filePath}`);
    }

    // Create form data
    const form = new FormData();
    form.append('chat_id', TELEGRAM_CHAT_ID);
    form.append('document', createReadStream(asset.filePath), {
      filename: asset.fileName,
      contentType: 'application/octet-stream',
    });
    
    if (asset.caption) {
      form.append('caption', asset.caption);
    }

    // Log upload attempt
    console.log(`Uploading ${asset.fileName}...`);

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
      {
        method: 'POST',
        body: form as any,
        headers: form.getHeaders(),
      }
    );

    const result = await response.json() as TelegramResponse;

    if (!response.ok || !result.ok) {
      throw new Error(`Telegram API Error: ${result.description || 'Unknown error'}`);
    }

    if (!result.result?.document) {
      throw new Error('Invalid response from Telegram API');
    }

    console.log(`✅ Successfully uploaded ${asset.fileName}`);
    return {
      success: true,
      fileId: result.result.document.file_id,
      fileName: asset.fileName,
      url: `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${result.result.document.file_id}`,
    };
  } catch (error) {
    console.error(`❌ Error uploading ${asset.fileName}:`, error);
    return {
      success: false,
      fileName: asset.fileName,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
};

export const uploadMultipleAssets = async (assets: AssetType[]) => {
  const results = [];
  for (const asset of assets) {
    try {
      const result = await uploadToTelegram(asset);
      results.push(result);
      // Add a delay between uploads to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to upload ${asset.fileName}:`, error);
      results.push({
        success: false,
        fileName: asset.fileName,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  }
  return results;
}; 