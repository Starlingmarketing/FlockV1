/**
 * Gmail Automation Suite - Main JavaScript
 * Common functions used across the application
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Flash messages
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(message => {
        // Add close button functionality
        const closeBtn = message.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                message.remove();
            });
            
            // Auto-close after 5 seconds
            setTimeout(() => {
                message.remove();
            }, 5000);
        }
    });
    
    // Tabs navigation (if present)
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the target tab content
            const targetId = link.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (!targetContent) return;
            
            // Hide all tab contents
            const allContents = document.querySelectorAll('.tab-content');
            allContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Remove active class from all tab links
            tabLinks.forEach(tabLink => {
                tabLink.classList.remove('active');
            });
            
            // Show the target tab content
            targetContent.classList.add('active');
            
            // Add active class to clicked tab link
            link.classList.add('active');
        });
    });
    
    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-copy');
            
            if (!textToCopy) return;
            
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Visual feedback
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                });
        });
    });
    
    // Toast notification function
    window.showToast = function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <span>${message}</span>
                <button class="toast-close">&times;</button>
            </div>
        `;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Add close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    };
    
    // Form validation helper
    window.validateForm = function(formId, rules) {
        const form = document.getElementById(formId);
        if (!form) return false;
        
        let isValid = true;
        
        // Clear previous errors
        const errorElements = form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.remove());
        
        // Check each rule
        for (const fieldName in rules) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            const fieldRules = rules[fieldName];
            let fieldValid = true;
            let errorMessage = '';
            
            // Check each rule for this field
            for (const rule in fieldRules) {
                const ruleValue = fieldRules[rule];
                
                switch (rule) {
                    case 'required':
                        if (ruleValue && !field.value.trim()) {
                            fieldValid = false;
                            errorMessage = 'This field is required';
                        }
                        break;
                        
                    case 'email':
                        if (ruleValue && field.value.trim()) {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(field.value.trim())) {
                                fieldValid = false;
                                errorMessage = 'Please enter a valid email address';
                            }
                        }
                        break;
                        
                    case 'min':
                        if (field.value.trim() && field.value.length < ruleValue) {
                            fieldValid = false;
                            errorMessage = `Minimum length is ${ruleValue} characters`;
                        }
                        break;
                        
                    case 'max':
                        if (field.value.trim() && field.value.length > ruleValue) {
                            fieldValid = false;
                            errorMessage = `Maximum length is ${ruleValue} characters`;
                        }
                        break;
                }
                
                if (!fieldValid) break;
            }
            
            if (!fieldValid) {
                isValid = false;
                
                // Show error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-message text-danger mt-1';
                errorDiv.textContent = errorMessage;
                
                // Insert after the field
                field.parentNode.insertBefore(errorDiv, field.nextSibling);
            }
        }
        
        return isValid;
    };
    
    // Helper to format dates
    window.formatDate = function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'short', 
            day: 'numeric'
        });
    };
    
    // Helper to format times
    window.formatTime = function(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    // Helper to format relative time
    window.formatRelativeTime = function(date) {
        const now = new Date();
        const diff = Math.floor((now - new Date(date)) / 1000); // Difference in seconds
        
        if (diff < 60) {
            return 'Just now';
        } else if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (diff < 604800) {
            const days = Math.floor(diff / 86400);
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else {
            return formatDate(date);
        }
    };
    
    console.log('Gmail Automation Suite initialized');
});
