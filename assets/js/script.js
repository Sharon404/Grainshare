javascript
// Minimal script: nav toggle + simple form validation
(function(){
function qs(id){return document.getElementById(id)}

// nav toggle with class toggling
var toggle = qs('navToggle');
var siteNav = qs('siteNav');

if(toggle && siteNav){
    toggle.addEventListener('click', function(){
        toggle.classList.toggle('active');
        siteNav.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    var navLinks = siteNav.querySelectorAll('a');
    navLinks.forEach(function(link){
        link.addEventListener('click', function(){
            toggle.classList.remove('active');
            siteNav.classList.remove('active');
        });
    });
}


// contact form
var form = document.getElementById('contactForm');
var submitBtn = document.getElementById('submitBtn');
if(form){
    form.addEventListener('submit', function(e){
        e.preventDefault();
        var name = qs('name').value.trim();
        var email = qs('email').value.trim();
        var message = qs('message').value.trim();
        var msg = qs('formMsg');
        
        // Validate form
        if(!name || !email || !message){
            msg.textContent = 'Please fill in all required fields.';
            msg.className = 'form-error';
            return;
        }

        // Add loading state
        form.classList.add('form-submitting');
        submitBtn.disabled = true;
        msg.textContent = '';
        msg.className = 'muted';

        // Submit form
        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                form.reset();
                msg.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                msg.className = 'form-success';
            } else {
                throw new Error('Submission failed');
            }
        })
        .catch(error => {
            msg.textContent = 'Sorry, there was a problem sending your message. Please try again or contact us directly.';
            msg.className = 'form-error';
        })
        .finally(() => {
            form.classList.remove('form-submitting');
            submitBtn.disabled = false;
        });
    })
}
})()
