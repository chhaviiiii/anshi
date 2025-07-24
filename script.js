document.addEventListener('DOMContentLoaded', function() {
    const feelingsInput = document.getElementById('feelingsInput');
    const shareBtn = document.getElementById('shareBtn');
    const messageDiv = document.getElementById('message');

    // Focus on input when page loads
    feelingsInput.focus();

    // Handle share button click
    shareBtn.addEventListener('click', handleShare);

    // Handle Enter key press (Ctrl+Enter to submit)
    feelingsInput.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            handleShare();
        }
    });

    async function handleShare() {
        const text = feelingsInput.value.trim();
        
        if (!text) {
            showMessage('Please write something to share...', 'error');
            return;
        }

        // Disable button and show loading state
        shareBtn.disabled = true;
        shareBtn.innerHTML = '<span class="button-text">Sending...</span> <span class="button-icon">💙</span>';
        
        try {
            const response = await fetch('/api/share-feelings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            
            if (data.success) {
                showMessage(data.message, 'success');
                feelingsInput.value = '';
            } else {
                showMessage(data.message, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Re-enable button
            shareBtn.disabled = false;
            shareBtn.innerHTML = '<span class="button-text">Share</span> <span class="button-icon">💙</span>';
        }
        
        // Add a gentle animation to the button
        shareBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            shareBtn.style.transform = '';
        }, 150);
    }

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.className = 'message';
                messageDiv.textContent = '';
            }, 300);
        }, 5000);
    }

    // Add some interactive effects
    feelingsInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            shareBtn.style.opacity = '1';
            shareBtn.style.transform = 'scale(1)';
        } else {
            shareBtn.style.opacity = '0.8';
            shareBtn.style.transform = 'scale(0.98)';
        }
    });

    // Add a subtle pulse animation to the input when focused
    feelingsInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1), 0 0 20px rgba(102, 126, 234, 0.1)';
    });

    feelingsInput.addEventListener('blur', function() {
        this.style.boxShadow = '';
    });

    // Add some random floating elements animation
    function createFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-heart';
        element.textContent = ['🤍', '💜', '🩵', '💛', '🤍', '🩷'][Math.floor(Math.random() * 6)];
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDuration = (Math.random() * 3 + 3) + 's';
        element.style.animationDelay = Math.random() * 2 + 's';
        
        document.querySelector('.floating-elements').appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 8000);
    }

    // Create floating elements periodically
    setInterval(createFloatingElement, 3000);
}); 