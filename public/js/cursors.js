const Cursors = {

    init: () => {

        const accordionRows = document.querySelectorAll('.accordion-row');
        const cursorWrap = document.querySelectorAll('.cursor-wrap');

        cursorWrap.forEach(function(el) {

            const cursor = el.querySelector('.cursor');

            el.addEventListener('mousemove', (event) => {

                cursor.classList.add('active');
                
            });

            window.addEventListener('scroll', (event) => {

                cursor.classList.remove('active');
                
            });

            el.addEventListener('mouseout', (event) => {

                cursor.classList.remove('active');
                
            });
        });

        cursorWrap.forEach(function(el) {

            const cursor = el.querySelector('.cursor');

            el.addEventListener('mousemove', (e) => {
                // e = Mouse click event.
                var rect = e.target.getBoundingClientRect();
                var x = e.clientX - rect.left; //x position within the element.
                var y = e.clientY - rect.top;  //y position within the element.

                // get left
                cursor.style.left = ( x - (cursor.offsetWidth / 2) )+'px';
                cursor.style.top = ( y - (cursor.offsetHeight / 2) )+'px';

                    
            });



        });
    }
}
