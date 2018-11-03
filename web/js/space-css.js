var toggledNav = '';
var toggledDropdown = '';

window.onload = runInit();

function runInit() {
    setTimeout(runSlideshows, 8000);
    scrollSpy();
}

document.addEventListener('click', function (event) {
    if(event.target.tagName.toLowerCase() == 'a') {
        if(event.target.dataset.option == null ||
            event.target.dataset.option !== 'dropdown') {
            if(toggledNav !== '') {
                untoggleNav(toggledNav);
            } 
            if(toggledDropdown !== '') {
                untoggleDropdown(toggledDropdown);
            }
            return;
        }
    } else {
        if(toggledDropdown !== '') {
            untoggleDropdown(toggledDropdown);
        }
    }

    /* Untoggle Modal when active and User clicks beside it */
    if(event.target.classList.contains('modal')) {
        if(event.target.classList.contains('modal-show')) {
            untoggleModal(event.target);
        }
    }
    /* Toggle Modal via data-option */
    if(event.target.dataset.option == 'modal') {
        console.log('Modal');
        if(event.target.dataset.trigger == 'open') {
            console.log('Open');
            toggleModal(document.getElementById(event.target.dataset.id.replace('#','')));
        } else {
            untoggleModal(document.getElementById(event.target.dataset.id.replace('#','')));
        }
    }



    if((event.target.dataset.option != null && event.target.dataset.option == 'dropdown') || 
       (event.target.parentElement.dataset.option != null && 
        event.target.parentElement.dataset.option == 'dropdown')) {
        dropdown = event.target;    
        if(event.target.dataset.option == null || event.target.dataset.option != 'dropdown') {
            dropdown = event.target.parentElement;
        }
        dropdown.classList.add('active');
        target = document.getElementById(dropdown.dataset.target.replace('#',''));
        if(target.classList.contains('dropdown-toggled')) {
            untoggleDropdown(dropdown);
        } else {
            toggleDropdown(dropdown);
        }
        return;
    }

    if (!event.target.matches('.navbar-toggle') && !event.target.parentElement.matches('.navbar-toggle')) return;
	event.preventDefault();
    toggleNavbar = event.target;    
    if(!event.target.matches('.navbar-toggle')) {
        toggleNavbar = event.target.parentElement;
    }
    element = toggleNavbar.dataset.target.replace('#', '');
    if(toggleNavbar.dataset.toggle == 'toggle') {
        toggleNav(toggleNavbar);
    } else {
        untoggleNav(toggleNavbar);
    }
}, false);

function toggleModal(element) 
{
    element.classList.add('modal-show');
}

function untoggleModal(element) 
{
    element.classList.remove('modal-show');
}

function toggleNav(element) 
{
    navbar = element.dataset.target.replace('#', '');
    document.getElementById(navbar).classList.add('navbar-toggled');
    element.innerHTML = '<span class="icon-remove"></span>'
    element.dataset.toggle = 'toggled';
    toggledNav = element;
}

function untoggleNav(element) 
{
    navbar = element.dataset.target.replace('#', '');
    document.getElementById(navbar).classList.remove('navbar-toggled');
    element.innerHTML = '<span class="icon-menu"></span>'
    element.dataset.toggle = 'toggle';
    toggledNav = '';
}

function toggleDropdown(dropdown) 
{
    target = document.getElementById(dropdown.dataset.target.replace('#',''));
    dropdown.classList.add('active');
    target.classList.add('dropdown-toggled');
    toggledDropdown = dropdown;
}

function untoggleDropdown(dropdown) 
{
    target = document.getElementById(dropdown.dataset.target.replace('#',''));
    dropdown.classList.remove('active');
    target.classList.remove('dropdown-toggled');
    toggledDropdown = '';
}

function removeFromArray(array, element) 
{
    index = array.indexOf(element);
    array.splice(index, 1);
}

function scrollSpy() 
{
    var section = document.querySelectorAll(".scrollspy");
    var sections = {};
    var link = 0;
    var lastElement = null;
  
    Array.prototype.forEach.call(section, function(e) {
        sections[e.id] = e.offsetTop;
    });
  
    window.onscroll = function() {
        var position = document.documentElement.scrollTop || document.body.scrollTop;
  
        for (link in sections) {
            if (sections[link] <= position) {
                if(lastElement != null) {
                    lastElement.classList.remove('active');
                }
                element = document.querySelector('a[href*=' + link + ']');
                if(element != null) {
                    element.classList.add('active');
                    lastElement = element;
                }
            }
        }
    };
};

function runSlideshows() 
{
    var slides = document.getElementsByClassName("slideshow");
    for(i = 0; i < slides.length; i++) {
        var slideshow = slides[i];
        var oldSlide = slideshow.dataset.target;
        var newSlide = +oldSlide + 1;
        deselectSlideshow(slideshow, oldSlide);
        selectSlideshow(slideshow, newSlide);
    }
    setTimeout(runSlideshows, 8000);
}

function deselectSlideshow(slideshow, slideId)
{
    var slides = slideshow.children;
    for(i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if(slide.classList.contains('slide') && slide.dataset.id == slideId) {
            slide.classList.remove('active');
            deselectSlideControl(slideshow, slideId);
            break;
        }
    }
}

function selectSlideshow(slideshow, slideId, run)
{
    run = run || 1;
    if(run > 2) {
        console.log('Does not found ' + slideId);
        return;
    }
    var slides = slideshow.children;
    var selected = false;
    for(i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if(slide.classList.contains('slide') && slide.dataset.id == slideId) {
            slideshow.dataset.target = slideId;
            slide.classList.add('active');
            selectSlideControl(slideshow, slideId);
            selected = true;
            break;
        }
    }
    if(!selected) {
        selectSlideshow(slideshow, 1, run+1);
    }
}
function maxSlide(slideshow)
{
    var slides = slideshow.children;
    var maxSlide = 1;;
    for(i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if(slide.classList.contains('slide')) {
            if(slide.dataset.id > maxSlide) {
                maxSlide = slide.dataset.id;
            }
        }
    }
    return maxSlide;
}

function selectSlideControl(slideshow, slideId) {
    var childs = slideshow.children;
    for(i = 0; i < childs.length; i++) {
        var child = childs[i];
        if(child.classList.contains('slide-control')) {
            var slideSelects = child.children;
            for(x = 0; x < slideSelects.length; x++) {
                var slideSelect = slideSelects[x];
                if(slideSelect.dataset.id == slideId) {
                    slideSelect.classList.add('active');
                    break;
                }
            }
        }
    }
}

function deselectSlideControl(slideshow, slideId) {
    var childs = slideshow.children;
    for(i = 0; i < childs.length; i++) {
        var child = childs[i];
        if(child.classList.contains('slide-control')) {
            var slideSelects = child.children;
            for(x = 0; x < slideSelects.length; x++) {
                var slideSelect = slideSelects[x];
                if(slideSelect.dataset.id == slideId) {
                    slideSelect.classList.remove('active');
                    break;
                }
            }
        }
    }
}

document.addEventListener('click', function (event) {
    if(event.target.classList.contains('slide-select')) {
        var slideshow = event.target.parentElement.parentElement;
        deselectSlideshow(slideshow, slideshow.dataset.target);
        selectSlideshow(slideshow, event.target.dataset.id);
    }
    if(event.target.classList.contains('slide-next')) {
        var slideshow = event.target.parentElement;
        deselectSlideshow(slideshow, slideshow.dataset.target);
        selectSlideshow(slideshow, (+slideshow.dataset.target+1));
    }
    if(event.target.classList.contains('slide-prev')) {
        var slideshow = event.target.parentElement;
        deselectSlideshow(slideshow, slideshow.dataset.target);
        if(slideshow.dataset.target == 1) {
            selectSlideshow(slideshow, maxSlide(slideshow));
        } else {
            selectSlideshow(slideshow, (+slideshow.dataset.target-1));
        }
    }
});