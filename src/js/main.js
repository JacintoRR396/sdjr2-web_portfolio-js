/*====================== HEADER - MENU : SHOW & HIDDEN ======================*/
const navMenu = document.querySelector('#nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const navClose = document.querySelector('#nav-close');
const navToogle = document.querySelector('#nav-toogle');

if( navToogle && navMenu ){
    navToogle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if( navLinks && navMenu ){
    navLinks.forEach( link => link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    }));
}

if( navClose && navMenu ){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*====================== ACCORDION SKILLS : SHOW & HIDDEN ======================*/
const skillsContent = document.querySelectorAll('.skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

if( skillsContent && skillsHeader ){
    function toogleSkills() {
        let itemClass = this.parentNode.className;
    
        for( content of skillsContent ) {
            content.className = 'skills__content skills__close';
        }
    
        if( itemClass === 'skills__content skills__close') {
            this.parentNode.className = 'skills__content skills__open';
        }
    }
    
    skillsHeader.forEach( header => header.addEventListener('click', toogleSkills));
}

/*====================== QUALIFICATION TABS : SHOW & HIDDEN ======================*/
const qualifyTabs = document.querySelectorAll('[data-target]');
const qualifyTabsContent = document.querySelectorAll('[data-content]');

if( qualifyTabs && qualifyTabsContent ){
    qualifyTabs.forEach( tab => tab.addEventListener('click', () => {
        // Update TabsContent
        const tabContentTarget = document.querySelector(tab.dataset.target);
        qualifyTabsContent.forEach( tabContent => {
            tabContent.classList.remove('qualification__active');
        });
        tabContentTarget.classList.add('qualification__active');

        // Update Tabs
        qualifyTabs.forEach( tab => {
            tab.classList.remove('qualification__active');
        });
        tab.classList.add('qualification__active');
    }));
}

/*====================== SERVICES MODAL : SHOW & HIDDEN ======================*/
const serviceModalButtons = document.querySelectorAll('.services__button');
const serviceModalViews = document.querySelectorAll('.services__modal');
const serviceModalCloses = document.querySelectorAll('.services__modal-close');

if( serviceModalButtons && serviceModalViews && serviceModalCloses ){
    function showModal (indexModal) {
        serviceModalViews[indexModal].classList.add('active-modal');
    }
    function hiddenModal (indexModal) {
        serviceModalViews[indexModal].classList.remove('active-modal');
    }
    serviceModalButtons.forEach( ( btn, index ) => btn.addEventListener('click', () => {
        showModal(index);
    }));
    serviceModalCloses.forEach( ( btn, index ) => btn.addEventListener('click', () => {
        hiddenModal(index);
    }));
}

/*====================== HEADER - MENU : ACTIVE LINK ======================*/
const sections = document.querySelectorAll('section[id]');

if( serviceModalButtons ) {
    function scrollActive() {
        const scrollY = window.pageYOffset;
    
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 50;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
            if( navLink !== null ) {
                if( scrollY > sectionTop && scrollY <= sectionTop + sectionHeight ) {
                    navLink.classList.add('nav__link-active');
                } else {
                    navLink.classList.remove('nav__link-active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActive);
}

/*====================== HEADER - BG : CHANGE ======================*/
const header = document.querySelector('#header');

if( header ) {
    function scrollHeaderTo() {
        const scrollY = window.pageYOffset;
        if ( scrollY >= 80 ){
            header.classList.add('header-scroll');
        } else {
            header.classList.remove('header-scroll');
        }
    }

    window.addEventListener('scroll', scrollHeaderTo);
}

/*====================== SCROLLUP : SHOW & HIDDEN ======================*/
const scrollUp = document.querySelector('#scroll-up');

if( scrollUp ) {
    function scrollupTo() {
        const scrollY = window.pageYOffset;
        if ( scrollY >= 560 ){
            scrollUp.classList.add('scrollup-show');
        } else {
            scrollUp.classList.remove('scrollup-show');
        }
    }

    window.addEventListener('scroll', scrollupTo);
}
