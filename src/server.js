import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { z } from 'zod';
    import { convertImage } from './converter.js';

    // Create an MCP server for image conversion
    const server = new McpServer({
      name: "Image Converter",
      version: "1.0.0",
      description: "An MCP server for converting images between different formats"
    });

    // Add convert image tool
    server.tool(
      "convert_image",
      { 
        imageBase64: z.string().describe("Base64 encoded image data"),
        inputFormat: z.string().describe("Current image format (jpg, png, etc.)"),
        outputFormat: z.string().describe("Desired output format (jpg, png, webp, etc.)")
      },
      async ({ imageBase64, inputFormat, outputFormat }) => {
        try {
          console.log(`Converting image from ${inputFormat} to ${outputFormat}`);
          
          // Decode base64 image
          const imageBuffer = Buffer.from(imageBase64, 'base64');
          
          // Convert the image
          const outputBuffer = await convertImage(imageBuffer, outputFormat);
          
          // Return the converted image as base64
          const outputBase64 = outputBuffer.toString('base64');
          
          return {
            content: [
              { 
                type: "text", 
                text: `Image successfully converted from ${inputFormat} to ${outputFormat}`
              },
              {
                type: "binary",
                mimeType: `image/${outputFormat.replace('jpg', 'jpeg')}`,
                base64: outputBase64
              }
            ]
          };
        } catch (error) {
          console.error('Error in convert_image tool:', error);
          return {
            content: [{ type: "text", text: `Error converting image: ${error.message}` }],
            isError: true
          };
        }
      },
      { description: "Convert an image from one format to another" }
    );

    // Add supported formats tool
    server.tool(
      "get_supported_formats",
      {},
      async () => {
        const formats = ['jpeg/jpg', 'png', 'webp', 'avif', 'tiff', 'gif'];
        return {
          content: [{ 
            type: "text", 
            text: `Supported image formats: ${formats.join(', ')}` 
          }]
        };
      },
      { description: "Get a list of supported image formats" }
    );

    export { server };
