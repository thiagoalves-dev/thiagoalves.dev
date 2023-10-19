const setRouteActiveClasses = () => {
    const menuLinks = document.getElementsByClassName('nma');

    for (let link of menuLinks) {
        if (link.pathname === window.location.pathname) {
            link.classList.add('active');
            link.classList.add('cube-palette-3');
        }
    }
};

export {
    setRouteActiveClasses
};