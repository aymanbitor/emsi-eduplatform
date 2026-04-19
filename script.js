// 1. Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });
}

// 2. Modal Logic & Multiple PDF Downloads
const modal = document.getElementById('courseModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');
const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').innerText;
        const module = card.querySelector('.instructor').innerText;
        
        const pdfLinks = card.getAttribute('data-pdfs');
        const pdfNames = card.getAttribute('data-names');
        
        let downloadButtonsHTML = '';

        if (pdfLinks && pdfNames) {
            const linksArray = pdfLinks.split(',');
            const namesArray = pdfNames.split(',');

            for (let i = 0; i < linksArray.length; i++) {
                const link = linksArray[i].trim();
                const name = namesArray[i] ? namesArray[i].trim() : 'Document PDF';
                
                downloadButtonsHTML += `
                    <a href="${link}" target="_blank" download class="btn-download btn-multiple">
                        <i class="fas fa-file-pdf"></i> ${name}
                    </a>
                `;
            }
        } else {
            downloadButtonsHTML = '<p style="color:#dc2626; margin-top:10px; font-weight:500;"><i class="fas fa-exclamation-circle"></i> Aucun fichier disponible pour le moment.</p>';
        }

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2>${title}</h2>
                <p>${module} - EMSI S4</p>
            </div>
            <div class="modal-info">
                <div><strong><i class="fas fa-folder-open"></i> Ressources :</strong> Supports et TP</div>
                <div><strong><i class="fas fa-graduation-cap"></i> Niveau :</strong> 2ème Année Ingénierie</div>
            </div>
            <h3 style="margin-top: 20px; color: #1e293b; font-size: 1.2rem;">Fichiers à télécharger :</h3>
            
            <div class="downloads-container">
                ${downloadButtonsHTML}
            </div>
        `;
        
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; 
    });
});

closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = (event) => { 
    if (event.target == modal) {
        modal.style.display = "none"; 
        document.body.style.overflow = "auto";
    }
}

// 3. Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');

if (filterBtns && courseCards.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'none';
                    card.offsetHeight; 
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
} // <--- كان هناك قوس ناقص هنا

// 4. Scroll Animation for Roadmap (الخريطة الأكاديمية)
const observerOptions = {
    threshold: 0.2, 
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const revealElements = document.querySelectorAll('.reveal-element');
revealElements.forEach(el => {
    observer.observe(el);
}); // <--- القوس الخاص بـ forEach ينتهي هنا

// ==========================================
// 5. Alert Logic for Unavailable Semesters
// ==========================================
function showUnavailableAlert(event) {
    // هاد السطر كيمنع الصفحة ترجع الفوق ملي كتكليكي
    event.preventDefault(); 
    
    // إظهار رسالة التنبيه بالفرنسية
    alert("⚠️ Contenu indisponible pour le moment. Il sera ajouté prochainement.");
}