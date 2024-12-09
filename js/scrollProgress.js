document.addEventListener("scroll", () => {
    document.querySelector('.header__scroll-progress').style.setProperty("width", ((document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)) * 100).toString() + "%")
})