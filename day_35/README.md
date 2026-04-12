# Day 35: MistralAI Chat Interface with Email Tools

An experimental Node.js application that demonstrates integrating MistralAI's language model with a chat interface and email functionality using LangChain tools.

## Features

- Interactive chat interface with MistralAI
- Email sending capabilities through integrated tools
- Colored console output for better readability
- Environment-based configuration

## Prerequisites

- Node.js (v16 or higher)
- Gmail account with OAuth2 setup for email functionality
- MistralAI API key

## Installation

1. Clone or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MistralAI Configuration
MISTRAL_API_KEY=your_mistral_api_key_here

# Gmail OAuth2 Configuration
GOOGLE_USER=your_gmail_address@gmail.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token
```

### Setting up Gmail OAuth2

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Gmail API
4. Create OAuth2 credentials (Client ID and Client Secret)
5. Generate a refresh token using OAuth2 flow
6. Add the credentials to your `.env` file

## Usage

Run the application:

```bash
node index.js
```

The chat interface will start with a welcome message. You can:

- Type messages to chat with MistralAI
- Ask the AI to send emails using natural language
- Press Ctrl+C to exit

### Example Interactions

```
You: Send an email to john@example.com with subject "Hello" and message "Hi there!"

MistralAI: I'll send that email for you.

You: What's the weather like today?

MistralAI: I'm sorry, but I don't have access to real-time weather data...
```

## Project Structure

```
day_35/
├── index.js                 # Main application file
├── services/
│   └── mail.service.js      # Email service using Nodemailer
├── package.json             # Project dependencies and scripts
├── .env                     # Environment variables (not committed)
└── README.md               # This file
```

## Dependencies

- `@langchain/mistralai`: MistralAI integration for LangChain
- `langchain`: Framework for building AI applications
- `nodemailer`: Email sending library
- `zod`: Schema validation
- `dotenv`: Environment variable management

## Learning Objectives

This experimental day covers:

- Integrating AI language models with Node.js
- Building interactive CLI applications
- Implementing tool-based AI agents
- Email integration with OAuth2 authentication
- Environment configuration management
- Error handling and user feedback

## Troubleshooting

- **Email not sending**: Check your Gmail OAuth2 credentials and ensure the Gmail API is enabled
- **API errors**: Verify your MistralAI API key and internet connection
- **Module errors**: Ensure all dependencies are installed with `npm install`

## License

ISC