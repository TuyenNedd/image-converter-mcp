# MCP Image Converter

    An MCP server that converts images between different formats using the Sharp image processing library.

    ## Features

    - Convert images between various formats (JPEG, PNG, WebP, AVIF, TIFF, GIF)
    - Base64 encoding/decoding for image data
    - Integration with MCP Inspector for testing

    ## Getting Started

    1. Install dependencies:
       ```
       npm install
       ```

    2. Run the server:
       ```
       npm run dev
       ```

    3. Test with MCP Inspector:
       ```
       npm run inspect
       ```

    ## Testing with MCP Inspector

    When you run the Inspector, it will:
    1. Start your MCP server
    2. Open a web interface in your browser
    3. Display all available tools
    4. Allow you to test each function with custom inputs

    ## Available Tools

    - `convert_image`: Convert an image from one format to another
      - Parameters:
        - `imageBase64`: Base64 encoded image data
        - `inputFormat`: Current image format (jpg, png, etc.)
        - `outputFormat`: Desired output format (jpg, png, webp, etc.)
      
    - `get_supported_formats`: Get a list of supported image formats

    ## Supported Formats

    - JPEG/JPG
    - PNG
    - WebP
    - AVIF
    - TIFF
    - GIF
