document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('submitButton');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    // Toast elements
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const closeToast = document.getElementById('closeToast');
    
    // Form validation
    function validateForm() {
      let isValid = true;
      
      // Reset errors
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      
      // Validate name
      if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
      }
      
      return isValid;
    }
    
    // Show toast notification
    function showToast(message) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
    
    // Close toast
    closeToast.addEventListener('click', function() {
      toast.classList.remove('show');
    });
    
    // Input event listeners to clear errors on typing
    nameInput.addEventListener('input', function() {
      nameError.textContent = '';
    });
    
    emailInput.addEventListener('input', function() {
      emailError.textContent = '';
    });
    
    messageInput.addEventListener('input', function() {
      messageError.textContent = '';
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }
      
      // Disable button while submitting
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      
      // Simulate form submission with timeout
      setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showToast('Message sent! We\'ll get back to you as soon as possible.');
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }, 1500);
    });
  });