/**
 * Gmail Automation Suite - Draft Creation Logic
 * Handles the automated creation of email drafts
 */

class DraftAutomation {
    constructor() {
        this.isRunning = false;
        this.status = 'idle';
        this.currentIndex = 0;
        this.totalEmails = 0;
        this.emailAddresses = [];
        this.firstNames = [];
        this.companies = [];
        this.useAI = false;
        this.delay = 2.0; // Default delay in seconds
        this.browser = 'firefox';
        this.templateSubject = '';
        this.templateBody = '';
        this.apiKey = '';
        this.customPrompt = '';
        this.model = 'sonar';
        this.temperature = 0.7;
        this.logFunction = console.log;
        this.updateStatusFunction = null;
        this.updateProgressFunction = null;
    }

    /**
     * Initialize automation with configuration
     * @param {Object} config - Configuration object
     */
    initialize(config) {
        this.browser = config.browser || 'firefox';
        this.delay = config.delay || 2.0;
        this.useAI = config.useAI || false;
        this.templateSubject = config.templateSubject || '';
        this.templateBody = config.templateBody || '';
        
        // AI settings
        if (this.useAI) {
            this.apiKey = config.apiKey || '';
            this.customPrompt = config.customPrompt || '';
            this.model = config.model || 'sonar';
            this.temperature = config.temperature || 0.7;
        }
        
        // Email data
        this.emailAddresses = config.emailAddresses || [];
        this.firstNames = config.firstNames || [];
        this.companies = config.companies || [];
        this.totalEmails = this.emailAddresses.length;
        this.currentIndex = 0;
        
        // Callbacks
        this.logFunction = config.logFunction || console.log;
        this.updateStatusFunction = config.updateStatusFunction || null;
        this.updateProgressFunction = config.updateProgressFunction || null;
        
        return this;
    }
    
    /**
     * Start the automation process
     */
    start() {
        if (this.isRunning) {
            this.log('Automation already running', 'warning');
            return false;
        }
        
        if (this.totalEmails === 0) {
            this.log('No emails to process', 'error');
            return false;
        }
        
        this.isRunning = true;
        this.status = 'starting';
        this.updateStatus('Starting automation...');
        this.log('Starting draft creation automation', 'info');
        
        // Start the automation flow
        this.startAutomation();
        
        return true;
    }
    
    /**
     * Stop the automation process
     */
    stop() {
        if (!this.isRunning) return false;
        
        this.isRunning = false;
        this.status = 'stopping';
        this.updateStatus('Stopping automation...');
        this.log('Stopping automation by user request', 'warning');
        
        // In a real implementation, we would send a request to stop the browser automation
        
        return true;
    }
    
    /**
     * Main automation flow
     */
    async startAutomation() {
        // In a real implementation, this would control the browser
        // Here we'll simulate the process
        
        try {
            this.log('Opening browser...', 'info');
            this.updateStatus('Opening browser...');
            await this.simulateDelay(1000);
            
            this.log(`Using ${this.browser} browser`, 'info');
            await this.simulateDelay(500);
            
            this.log('Navigating to Gmail...', 'info');
            this.updateStatus('Navigating to Gmail...');
            await this.simulateDelay(2000);
            
            this.log('Waiting for Gmail to load...', 'info');
            this.updateStatus('Waiting for Gmail to load...');
            await this.simulateDelay(1500);
            
            this.log('Gmail loaded successfully', 'success');
            
            // Process each email
            for (let i = 0; i < this.totalEmails; i++) {
                if (!this.isRunning) {
                    this.log('Automation stopped by user', 'warning');
                    this.finishAutomation('stopped');
                    return;
                }
                
                this.currentIndex = i;
                await this.processDraft(i);
                
                // Break if we've reached the end or if stopped
                if (!this.isRunning || i >= this.totalEmails - 1) break;
                
                // Wait before next email
                this.log(`Waiting ${this.delay} seconds before next email...`, 'info');
                this.updateStatus(`Waiting for next email...`);
                await this.simulateDelay(this.delay * 1000);
            }
            
            // Finish automation
            this.log('Draft creation completed successfully', 'success');
            this.finishAutomation('completed');
            
        } catch (error) {
            this.log(`Error during automation: ${error.message}`, 'error');
            this.finishAutomation('error');
        }
    }
    
    /**
     * Process a single draft email
     * @param {number} index - Email index to process
     */
    async processDraft(index) {
        const email = this.emailAddresses[index] || '';
        const firstName = this.firstNames[index] || '';
        const company = this.companies[index] || '';
        
        if (!email) {
            this.log(`Skip index ${index}: No email address`, 'warning');
            return;
        }
        
        this.log(`Processing draft for: ${email}`, 'info');
        this.updateStatus(`Processing email ${index + 1} of ${this.totalEmails}`);
        this.updateProgress(index + 1, this.totalEmails);
        
        try {
            this.log('Clicking Compose button...', 'info');
            await this.simulateDelay(500);
            
            this.log('Entering recipient email...', 'info');
            await this.simulateDelay(300);
            
            // Generate email content
            let subject = this.templateSubject;
            let body = this.templateBody;
            
            // Replace template variables
            subject = subject.replace(/{first_name}/g, firstName).replace(/{company}/g, company);
            body = body.replace(/{first_name}/g, firstName).replace(/{company}/g, company);
            
            // Use AI if enabled
            if (this.useAI) {
                this.log(`Generating AI content for ${firstName} at ${company}...`, 'info');
                await this.simulateDelay(1500);
                
                // In a real implementation, this would call the AI API
                // For simulation, we'll use a fake response
                body = this.simulateAIGeneration(firstName, company);
                this.log('AI content generated successfully', 'success');
            }
            
            this.log('Entering subject...', 'info');
            await this.simulateDelay(300);
            
            this.log('Entering email body...', 'info');
            await this.simulateDelay(800);
            
            this.log('Closing compose window to save draft...', 'info');
            await this.simulateDelay(500);
            
            this.log(`Draft created successfully for ${email}`, 'success');
            
        } catch (error) {
            this.log(`Error creating draft for ${email}: ${error.message}`, 'error');
        }
    }
    
    /**
     * Simulate AI-generated content (for demo purposes)
     */
    simulateAIGeneration(firstName, company) {
        // In a real implementation, this would call the Perplexity API
        // Here we're just returning a template with variables replaced
        return `Dear ${firstName},

I hope this email finds you well. I recently came across ${company} and was impressed by your innovative approach in the industry.

I believe there could be some valuable synergies between our organizations. My company specializes in solutions that could potentially help you [specific benefit tailored to ${company}].

Would you be open to a brief 15-minute call next week to explore how we might work together? I'm available Tuesday or Thursday afternoon if either works for you.

Looking forward to connecting,
[Your Name]`;
    }
    
    /**
     * Finish the automation process
     * @param {string} status - Final status (completed, stopped, error)
     */
    finishAutomation(status) {
        this.isRunning = false;
        this.status = status;
        
        switch (status) {
            case 'completed':
                this.updateStatus('Completed successfully');
                break;
            case 'stopped':
                this.updateStatus('Stopped by user');
                break;
            case 'error':
                this.updateStatus('Error during automation');
                break;
            default:
                this.updateStatus('Automation finished');
                break;
        }
    }
    
    /**
     * Log a message
     * @param {string} message - Message to log
     * @param {string} type - Message type (info, success, warning, error)
     */
    log(message, type = 'info') {
        if (typeof this.logFunction === 'function') {
            this.logFunction(message, type);
        } else {
            console.log(`[${type.toUpperCase()}] ${message}`);
        }
    }
    
    /**
     * Update automation status
     * @param {string} status - Status message
     */
    updateStatus(status) {
        if (typeof this.updateStatusFunction === 'function') {
            this.updateStatusFunction(status);
        }
    }
    
    /**
     * Update progress indicators
     * @param {number} current - Current progress
     * @param {number} total - Total items
     */
    updateProgress(current, total) {
        if (typeof this.updateProgressFunction === 'function') {
            this.updateProgressFunction(current, total);
        }
    }
    
    /**
     * Helper function to simulate delay (for demo)
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} - Resolves after delay
     */
    simulateDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export the class
window.DraftAutomation = DraftAutomation;
