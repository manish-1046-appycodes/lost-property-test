const Accordion = {
    init: (ref) => {
        let accordionToggles = ref.querySelectorAll('[data-accordiontoggle]');
        accordionToggles.forEach(function(el) {
            const group = el.closest('.accordion-group');
            const par = el.closest('.accordion-row');
            const accChild = par.querySelector('.accordion-child');
            
            el.addEventListener('click', function() {
                
                closeAccordions(par);

                
                if ( group.querySelectorAll('.accordion-row.active').length ) {
                    setTimeout(function() {
                        toggleAccordion();
                    }, 0);
                } else {
                    setTimeout(function() {
                        toggleAccordion();
                    }, 0);
                }
                
                
                
            });

            const toggleAccordion = () => {
                par.classList.toggle('active');

                if ( par.classList.contains('active') ) {
                    const height = accChild.firstElementChild.offsetHeight;
                    
                    accChild.style.height = '0' + 'px';
                    setTimeout(function() {
                        accChild.style.height = height + 'px';
                    }, 10);

                    if ( par.querySelector('.toggle-position') ) {
                        setTimeout(function() {
                            par.querySelector('.toggle-position').classList.remove('relative')
                            par.querySelector('.toggle-position').classList.add('absolute')
                        }, 500);
                    }

                    if ( par.querySelector('.hide-sub') ) {
                        setTimeout(function() {
                            par.querySelector('.hide-sub').classList.add('opacity-0')
                            par.querySelector('.hide-sub').classList.remove('opacity-100')
                        }, 0);
                    }

                    par.querySelector('[data-accordiontoggle]').classList.add('rotate-45');
                    if ( par.querySelector('.accordion-btn-initial') ) {
                        par.querySelector('.accordion-btn-initial').classList.add('opacity-0');
                    }

                    setTimeout(function() {
                        accChild.classList.add('opacity-100');
                        accChild.classList.remove('opacity-0');

                        accChild.style.height = 'auto';
                    }, 500)
                } else {
                    const height = accChild.firstElementChild.offsetHeight;
                    accChild.style.height = height + 'px';
                    accChild.classList.remove('opacity-100');
                    accChild.classList.add('opacity-0');
                    setTimeout(function() {
                        accChild.style.height = '0' + 'px';
                        par.querySelector('[data-accordiontoggle]').classList.remove('rotate-45');
                        if ( par.querySelector('.accordion-btn-initial') ) {
                            par.querySelector('.accordion-btn-initial').classList.remove('opacity-0');
                        }
                    }, 500);

                    if ( par.querySelector('.toggle-position') ) {
                        setTimeout(function() {
                            par.querySelector('.toggle-position').classList.add('relative')
                            par.querySelector('.toggle-position').classList.remove('absolute')
                        }, 500);
                    }

                    if ( par.querySelector('.hide-sub') ) {
                        setTimeout(function() {
                            par.querySelector('.hide-sub').classList.add('opacity-100')
                            par.querySelector('.hide-sub').classList.remove('opacity-0')
                        }, 500);
                    }
                }
            }
        });

        const closeAccordions = (par) => {
            const group = par.closest('.accordion-group');
            const accordionRows = group.querySelectorAll('.accordion-row');
            accordionRows.forEach(function(el) {
                if ( el !== par ) {
                    
                    if ( el.classList.contains('active') ) {
                        const accChild = el.querySelector('.accordion-child');
                        el.classList.remove('active');

                        const height = accChild.firstElementChild.offsetHeight;
                        accChild.style.height = height + 'px';
                        
                        accChild.classList.remove('opacity-100');
                        accChild.classList.add('opacity-0');
                        setTimeout(function() {
                            accChild.style.height = '0' + 'px';
                            el.querySelector('[data-accordiontoggle]').classList.remove('rotate-45');
                            if ( par.querySelector('.accordion-btn-initial') ) {
                                el.querySelector('.accordion-btn-initial').classList.remove('opacity-0');
                            }

                            
                        }, 500);
                    }
                }
            });
        }


        const accordionRows = document.querySelectorAll('.accordion-row');
        const accordionGroups = document.querySelectorAll('.accordion-group');

        /*
        accordionGroups.forEach(function(el) {
            
            const previews = el.querySelectorAll('.accordion-preview');

            el.addEventListener('mousemove', (event) => {

                previews.forEach(function(preview) {
                    
                    preview.classList.add('opacity-100');
                    preview.classList.remove('opacity-0');
                });
                
            });

            window.addEventListener('scroll', (event) => {

                previews.forEach(function(preview) {
                    preview.classList.add('opacity-0');
                    preview.classList.remove('opacity-100');
                });
                
            });

            

            const notHoverables = el.querySelectorAll('.accordion-child, .button-round, [data-accordiontoggle]');

            notHoverables.forEach(function(notHoverable) {
                notHoverable.addEventListener('mousemove', (event) => {
                    event.stopPropagation();
                });
            });

            el.addEventListener('mouseout', (event) => {

                previews.forEach(function(preview) {
                    preview.classList.remove('opacity-100');
                    //preview.classList.add('opacity-0');
                });
                
            });
        });
        */

        /*
        accordionRows.forEach(function(el) {

            const preview = el.querySelector('.accordion-preview');
            const notHoverables = el.querySelectorAll('.accordion-child, .button-round, [data-accordiontoggle]');

            el.addEventListener('mousemove', (event) => {

                // get left
                preview.style.left = ( event.clientX - (preview.offsetWidth / 2) )+'px';
                preview.style.top = ( event.clientY - (preview.offsetHeight / 2) )+'px';

                //preview.classList.remove('invisible');
                //preview.classList.add('opacity-100');
                    
            });

            el.addEventListener('mouseout', (event) => {
                //preview.classList.remove('opacity-100');
                //preview.classList.add('invisible');
            });

            

        });
        */
    }
}
