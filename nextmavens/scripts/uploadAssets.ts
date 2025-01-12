import { config } from 'dotenv';
import { resolve } from 'path';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { uploadMultipleAssets } from '../lib/uploadAssets';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

// Verify environment variables are loaded
console.log('Checking configuration...');
if (!process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || !process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID) {
  console.error('Missing Telegram configuration. Please check your .env.local file.');
  process.exit(1);
}

const ASSETS_DIR = join(process.cwd(), 'public', 'assets');

async function* getFiles(dir: string): AsyncGenerator<string> {
  const dirents = await readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = join(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function uploadAllAssets() {
  const assets: { filePath: string; fileName: string; caption?: string }[] = [];
  
  try {
    for await (const filePath of getFiles(ASSETS_DIR)) {
      const relativePath = filePath.replace(ASSETS_DIR, '').replace(/^\//, '');
      assets.push({
        filePath,
        fileName: relativePath,
        caption: `Asset: ${relativePath}`,
      });
    }

    console.log(`Found ${assets.length} files to upload...`);
    
    const results = await uploadMultipleAssets(assets);
    
    // Save results to a file
    const successfulUploads = results.filter(r => r.success);
    const failedUploads = results.filter(r => !r.success);

    console.log('\nUpload Summary:');
    console.log(`✅ Successfully uploaded: ${successfulUploads.length}`);
    console.log(`❌ Failed uploads: ${failedUploads.length}`);

    // Save file IDs for future reference
    const fileIds = results
      .filter(r => r.success)
      .reduce((acc, r) => ({
        ...acc,
        [r.fileName]: r.fileId
      }), {});

    await writeFile(
      join(process.cwd(), 'assets-map.json'),
      JSON.stringify(fileIds, null, 2)
    );

    console.log('\nFile IDs saved to assets-map.json');

  } catch (error) {
    console.error('Error uploading assets:', error);
  }
}

// Run the upload
uploadAllAssets(); 