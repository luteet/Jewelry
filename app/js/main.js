
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageBody = document.querySelectorAll('.image-body, figure');
imageBody.forEach(imageBody => {
	const img = imageBody.querySelector('img'), style = getComputedStyle(imageBody);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageBody.style.paddingTop = Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%';
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=-=-=- <header-lang> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerLangTarget = $(".header__lang--target")
	if(headerLangTarget) {
	
		event.preventDefault();
		if(headerLangTarget.classList.contains('_active')) {
			document.querySelectorAll('.header__lang--target._active').forEach(element => {
				element.classList.remove('_active');
			})
		} else {
			document.querySelectorAll('.header__lang--target._active').forEach(element => {
				element.classList.remove('_active');
			})
			headerLangTarget.classList.add('_active')
		}
	
	} else if(!$(".header__lang")) {
		document.querySelectorAll('.header__lang--target._active').forEach(element => {
			element.classList.remove('_active');
		})
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-lang> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const filterTarget = $(".filter__target")
	if(filterTarget) {
	
		const filter = filterTarget.closest('.filter');
		filterTarget.classList.toggle('_active');
		if(filterTarget.classList.contains('_active')) {
			filter.style.zIndex = 3;
		}

	
	} else if(!$('.filter')) {
		document.querySelectorAll('.filter__target._active').forEach(filterTarget => {
			filterTarget.classList.remove('_active')
		})
	}

	const sortTarget = $(".sort__target")
	if(sortTarget) {
	
		//const sort = filterTarget.closest('.filter');
		sortTarget.classList.toggle('_active');
		/* if(filterTarget.classList.contains('_active')) {
			filter.style.zIndex = 3;
		} */

	
	} else if(!$('.sort')) {
		document.querySelectorAll('.sort__target._active').forEach(sortTarget => {
			sortTarget.classList.remove('_active')
		})
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <product-info> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const productInfoNavLink = $(".product__info--nav a");
	if(productInfoNavLink) {
	
		event.preventDefault();
		if(!productInfoNavLink.classList.contains('active')) {

			document.querySelectorAll('.product__info--nav a.active').forEach(activeLink => {
				activeLink.classList.remove('active')
			});

			productInfoNavLink.classList.add('active')

			const productInfoBlockActive = document.querySelector('.product__info--block._active'),
				  productInfoBlock = document.querySelector(productInfoNavLink.getAttribute('href'));
	
			productInfoBlock.classList.add('_active');
			productInfoBlockActive.classList.remove('_active')
		}
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </product-info> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll-to-up> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const toUp = $(".to-up")
	if(toUp) {
	
		body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll-to-up> -=-=-=-=-=-=-=-=-=-=-=-=

	
})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-


const filterTarget = document.querySelectorAll('.filter__target');
filterTarget.forEach(filterTarget => {
	filterTarget.addEventListener('transitionend', function (event) {
		const filter = filterTarget.closest('.filter');
		if(event.propertyName == 'width' && !filterTarget.classList.contains('_active')) {
			filter.style.removeProperty('z-index');
		}
	})
})



const sortInputs = document.querySelectorAll('.sort__element--input');
sortInputs.forEach(sortInput => {
	const sortTarget = sortInput.closest('.sort').querySelector('.sort__target').querySelector('b'),
		  sortElementText = sortInput.closest('.sort__element').querySelector('.sort__element--text');
	sortInput.addEventListener('change', function (event) {
		if(sortInput.checked) {
			sortTarget.textContent = sortElementText.textContent;
		}
	})
})


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

let productGalleryMain, productGalleryPagination;

const appendToOnTablet = document.querySelectorAll("[data-append-to]"),
	  appendToOnTabletArray = [];

appendToOnTablet.forEach(appendToOnTablet => {
	appendToOnTablet.style.display = "none";
	appendToOnTabletArray.push({
		element: appendToOnTablet,
		parent: appendToOnTablet.parentElement,
		appendAddress: document.querySelector(appendToOnTablet.dataset.appendTo),
	})
})

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

function resize() {
	html.style.setProperty("--height-header", header.offsetHeight + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");

	windowSize = window.innerWidth;
	
	resizeCheckFunc(992,
		function () {  // screen > 992px

			productGallerySlider(windowSize);

			Array.from(appendToOnTabletArray).forEach(appendElement => {
				appendElement["element"].style.display = "none";
				appendElement["appendAddress"].append(appendElement["element"]);
				appendElement["element"].style.removeProperty('display');
			})

		},
		function () {  // screen < 992px
			
			productGallerySlider(windowSize);
			
			Array.from(appendToOnTabletArray).forEach(appendElement => {
				appendElement["element"].style.display = "none";
				appendElement["parent"].append(appendElement["element"]);
				appendElement["element"].style.removeProperty('display');
			})

		}
	);

	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=


// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.hero__slider')) {

	const heroSlider = new Splide('.hero__slider', {
		type: "fade",
		rewind: true,
		gap: 0,
		speed: 1000,
		autoplay: true,
	});

	heroSlider.mount();

}



function productGallerySlider(windowSize) {

	if(productGalleryMain) productGalleryMain.destroy();
	if(productGalleryPagination) productGalleryPagination.destroy();

	if(document.querySelector('.product__gallery-main') && document.querySelector('.product__gallery-pagination')) {
		productGalleryMain = new Splide('.product__gallery-main', {
			type: (windowSize >= 992) ? 'fade' : 'slide',
			perPage: 1,
			rewind: (windowSize >= 992) ? true : false,
			padding: {right: (windowSize >= 992) ? 0 : 20},
			gap: 16,
			speed: 1000,
			arrows: false, pagination: (windowSize >= 992) ? false : true,
		});

		if(windowSize >= 992) {
			productGalleryPagination = new Splide('.product__gallery-pagination', {
				rewind: true,
				gap: 20,
				autoWidth: true,
				isNavigation: true,
				arrows: false, pagination: false,
			});
		
			productGalleryMain.sync( productGalleryPagination );
		}

		productGalleryMain.mount();
	
		if(windowSize >= 992) {
			productGalleryPagination.mount();
		}
		
	}
}


if(document.querySelector('.similar__slider')) {

	document.querySelectorAll('.similar__slider').forEach(slider => {
		const slides = slider.querySelectorAll('.splide__slide');
	
		const similarSlider = new Splide(slider, {
			perPage: 3,
			gap: 20,
			speed: 1000,
			drag: (slides.length > 3) ? true : false,
			arrows: (slides.length > 3) ? true : false,
			pagination: false,
			breakpoints: {
				992: {
					perPage: 2,
					pagination: true,
					arrows: false,
					drag: (slides.length > 2) ? true : false,
					padding: {right: 30},
				},
				600: {
					perPage: 1,
					drag: (slides.length > 1) ? true : false,
				}
			}
		});
	
		similarSlider.mount();
	})

	

}


// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <custom-input-range> -=-=-=-=-=-=-=-=-=-=-=-=

const range = document.querySelectorAll('.range');
range.forEach(range => {

	const inputMin = range.querySelector('.range__input._min'),
		  inputMax = range.querySelector('.range__input._max'),
		  element = range.querySelector('.range__element'),
		  infoMin = range.querySelector('.range__info-min'),
		  infoMax = range.querySelector('.range__info-max'),
		  currency = range.dataset.currency;

	let min = Number(inputMin.value), max = Number(inputMax.value);

	const rangeSlider = noUiSlider.create(element, {
		start: [min, max],
		connect: true,
		step: 1,
		range: {
			'min': min,
			'max': max,
			
		}
	});

	rangeSlider.on('update', function (values, handle) {
		inputMin.value = values[0];
		inputMax.value = values[1];

		infoMin.textContent = `${currency} ${values[0]}`;
		infoMax.textContent = `${currency} ${values[1]}`;
	});

	range.closest('form').addEventListener('reset', function (event) {
		rangeSlider.set([min,max])
		inputMin.value = min;
		inputMax.value = max;

		infoMin.textContent = `${currency} ${min}`;
		infoMax.textContent = `${currency} ${max}`;
	})
})


// =-=-=-=-=-=-=-=-=-=-=-=- </custom-input-range> -=-=-=-=-=-=-=-=-=-=-=-=


function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
		top: box.top + window.pageYOffset,
		right: box.right + window.pageXOffset,
		bottom: box.bottom + window.pageYOffset,
		left: box.left + window.pageXOffset
	};
}

const clipboard = new ClipboardJS('.copy-btn');

clipboard.on('success', function(event) {
    const trigger = event.trigger,
		  coords = getCoords(trigger);

	if(document.querySelector('.copy-message')) document.querySelector('.copy-message').remove();

	const copyMessage = document.createElement('div');
	copyMessage.classList.add('copy-message');
	copyMessage.style.left = coords['left'] + (trigger.offsetWidth / 2) + 'px';
	copyMessage.style.top = coords['top'] + 'px';
	copyMessage.style.opacity = 0;
	copyMessage.textContent = trigger.dataset.message;

	body.append(copyMessage);
	
	setTimeout(() => {
		copyMessage.style.opacity = 1;
	},0)

	setTimeout(() => {
		if(copyMessage) {
			copyMessage.style.opacity = 0;
			setTimeout(() => {
				copyMessage.remove();
			},200)
		}
	},1000)
	
});



// =-=-=-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-=-=

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-=-=


