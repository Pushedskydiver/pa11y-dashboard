module.exports = (function() {
  const backToTopLink = $('[data-back-to-top]');

  function animateSection(sectionName, offset) {
    $('html, body').animate({
      scrollTop: $(sectionName).offset().top + offset
    }, 750);
  }

  function backToTop(event) {
    event.preventDefault();
    $(animateSection($('#top'), -55));
  }

  function init() {
    if (backToTopLink.length > 0) {
      backToTopLink.click(backToTop);
    }
  }

  return {
    init
  };
}());
