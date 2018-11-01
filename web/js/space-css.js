var toggledNav = '';
var toggledDropdown = '';

window.onload = scrollSpy();

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
    }

    if((event.target.dataset.option != null && event.target.dataset.option == 'dropdown') || 
       (event.target.parentElement.dataset.option != null && 
        event.target.parentElement.dataset.option == 'dropdown')) {
        dropdown = event.target;    
        if(event.target.dataset.option == null || event.target.dataset.option != 'dopdown') {
            dropdown = event.target.parentElement;
        }
        target = document.getElementById(dropdown.dataset.target.replace('#',''));
        if(target.classList.contains('dropdown-toggled')) {
            untoggleDropdown(target);
        } else {
            toggleDropdown(target);
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

function toggleNav(element) {
    navbar = element.dataset.target.replace('#', '');
    document.getElementById(navbar).classList.add('navbar-toggled');
    element.innerHTML = '<span class="icon-remove"></span>'
    element.dataset.toggle = 'toggled';
    toggledNav = element;
}

function untoggleNav(element) {
    navbar = element.dataset.target.replace('#', '');
    document.getElementById(navbar).classList.remove('navbar-toggled');
    element.innerHTML = '<span class="icon-menu"></span>'
    element.dataset.toggle = 'toggle';
    toggledNav = '';
}

function toggleDropdown(element) {
    target.classList.add('dropdown-toggled');
    toggledDropdown = element;
}

function untoggleDropdown(element) {
    target.classList.remove('dropdown-toggled');
    toggledDropdown = '';
}

function removeFromArray(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}

function scrollSpy() {
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
                element = document.querySelector('a[href*=' + link + ']')
                element.classList.add('active');
                lastElement = element;
            }
        }
    };
};