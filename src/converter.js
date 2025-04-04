import sharp from 'sharp';
    import fs from 'fs/promises';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const tempDir = path.join(__dirname, '..', 'temp');

    // Ensure temp directory exists
    async function ensureTempDir() {
      try {
        await fs.mkdir(tempDir, { recursive: true });
      } catch (error) {
        console.error('Error creating temp directory:', error);
      }
    }

    // Convert image from one format to another
    export async function convertImage(inputBuffer, outputFormat) {
      try {
        await ensureTempDir();
        
        // Validate format
        const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'gif'];
        if (!validFormats.includes(outputFormat.toLowerCase())) {
          throw new Error(`Unsupported format: ${outputFormat}. Supported formats: ${validFormats.join(', ')}`);
        }

        // Process the image
        const outputBuffer = await sharp(inputBuffer)
          .toFormat(outputFormat.toLowerCase())
          .toBuffer();

        return outputBuffer;
      } catch (error) {
        console.error('Error converting image:', error);
        throw error;
      }
    }

    // Save buffer to a temporary file
    export async function saveBufferToTemp(buffer, filename) {
      await ensureTempDir();
      const filePath = path.join(tempDir, filename);
      await fs.writeFile(filePath, buffer);
      return filePath;
    }

    // Read file as buffer
    export async function readFileAsBuffer(filePath) {
      return await fs.readFile(filePath);
    }
