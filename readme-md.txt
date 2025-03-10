# Gmail Automation Suite

A comprehensive web-based tool for creating and sending personalized Gmail drafts at scale. Create AI-generated emails and automate your outreach campaigns with controlled timing and scheduling.

## Features

- **AI-Powered Email Creation**: Generate personalized emails using Perplexity AI
- **CSV Contact Import**: Upload contact lists with emails, names, and company information
- **Automated Draft Creation**: Bulk create personalized drafts in your Gmail account
- **Scheduled Sending**: Configure timing between emails and business hours for sending
- **Web Interface**: Clean, modern UI accessible from any device
- **Progress Tracking**: Monitor email creation and sending status in real-time

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Web browser (Firefox, Chrome, or Safari)
- Gmail account
- Perplexity AI API key (optional, for AI-generated content)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/gmail-automation-suite.git
   cd gmail-automation-suite
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Set up environment variables (create a `.env` file):
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   PERPLEXITY_API_KEY=your-perplexity-api-key  # Optional
   ```

5. Run the application:
   ```
   flask run
   ```

6. Access the application in your browser:
   ```
   http://localhost:5000
   ```

### Railway Deployment

This application is configured for deployment on Railway. To deploy:

1. Create a Railway account and install the Railway CLI
2. Login to Railway:
   ```
   railway login
   ```

3. Initialize the project:
   ```
   railway init
   ```

4. Set up environment variables in Railway:
   ```
   railway vars set SECRET_KEY=your-secret-key-here
   railway vars set FLASK_ENV=production
   railway vars set PERPLEXITY_API_KEY=your-perplexity-api-key  # Optional
   ```

5. Deploy the application:
   ```
   railway up
   ```

## Usage

### Creating Email Drafts

1. Go to the "Create Drafts" section
2. Upload your CSV file with contact information
3. Configure column mappings (email, first name, company)
4. Set up email template or enable AI generation
5. Configure AI settings if using Perplexity
6. Start automation to create drafts in your Gmail account

### Sending Email Drafts

1. Go to the "Send Drafts" section
2. Configure timing settings (delay between emails)
3. Set up schedule (optional) to only send during specific hours
4. Start automation to send drafts according to your schedule

## Technologies Used

- **Backend**: Flask (Python web framework)
- **Frontend**: HTML, CSS, JavaScript
- **Styling**: Custom CSS (inspired by osmo.supply)
- **Browser Automation**: Selenium WebDriver
- **AI Integration**: Perplexity API
- **Deployment**: Railway

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is designed for legitimate email campaigns. Please use responsibly and in compliance with email service provider policies and anti-spam regulations.
