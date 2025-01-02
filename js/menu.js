const btnMenuList = document.querySelector('#btn-menu-list');
const btnMenuClose = document.querySelector('#btn-menu-close');
const containerAside = document.querySelector('aside');

btnMenuList.addEventListener('click', () => {
    containerAside.classList.add('aside-visible');
});

btnMenuClose.addEventListener('click', () => {
    containerAside.classList.remove('aside-visible');
});

btnCategory.forEach(btn => btn.addEventListener('click', () => {
    containerAside.classList.remove('aside-visible');
}));