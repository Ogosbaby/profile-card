document.addEventListener("DOMContentLoaded", () => {
    const timeElement = document.querySelector('[data-testid="test-user-time"]');
    
    if (timeElement) {
        const updateTime = () => {
            timeElement.textContent = Date.now();
        };
        setInterval(updateTime, 100); 
        updateTime();
    }

    const form = document.getElementById("contact-form");
    const success = document.getElementById("success-message");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            if (success) success.classList.add("visually-hidden");
            
            let valid = true;
            let firstErrorField = null; 

          
            const check = (fieldId, testFn, message) => {
                const input = document.getElementById(fieldId);
                const errorEl = document.getElementById(`error-${fieldId}`);
                
                if (!input || !errorEl) return; 

                const hasError = !testFn(input.value.trim());

                errorEl.textContent = hasError ? message : "";
                input.setAttribute('aria-invalid', hasError ? 'true' : 'false');
                
                if (hasError) {
                    valid = false;
                    if (!firstErrorField) {
                        firstErrorField = input;
                    }
                }
            };
            check("contact-name", (v) => v.length > 0, "Full name is required.");
            check(
                "contact-email",
                (v) => v.length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v),
  
            );
            

            check("contact-subject", (v) => v.length > 0, "Subject is required.");
            

            check(
                "contact-message",
                (v) => v.length >= 10,
                `Message must be at least 10 characters (currently ${v.length}).`
            );


            if (valid && success) {
                success.classList.remove("visually-hidden");
                form.reset();
                
 
                success.setAttribute("tabindex", "-1");
                success.focus();
                
            } else if (firstErrorField) {

                firstErrorField.focus();
            }
        });

        form.addEventListener("reset", () => {
            ["contact-name", "contact-email", "contact-subject", "contact-message"].forEach((id) => {
                const errorEl = document.getElementById(`error-${id}`);
                const input = document.getElementById(id);
                if (errorEl) errorEl.textContent = "";
                if (input) input.setAttribute('aria-invalid', 'false');
            });
            if (success) success.classList.add("visually-hidden");
        });
    }
});