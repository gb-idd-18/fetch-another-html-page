let loadContentFromHtmlFile = (url) => {

	// Put up the loading screen
	document.querySelector('.loading').classList.add('show')

	fetch(url)
		.then((response) => {
			return response.text() // Convert it something readable
		})
		.then((html) => {

			let parser = new DOMParser()
			let newDocument = parser.parseFromString(html, 'text/html')

			// The loadthis.html page has been loaded!
			// Append the content from the new page into the old page
			// document.querySelector('#content').innerHTML += newDocument.querySelector('#content').innerHTML
			
			// REAPLACE the content, rather than append
			document.querySelector('#content').innerHTML = newDocument.querySelector('#content').innerHTML
			
			// Change the page url by adding "history" to the browser's back/forward buttons
			window.history.pushState({ /*data can be passed here*/ }, '', `${url}`)

			let $script = document.querySelector('#content').querySelector('script')
			try {
				// This has security issues! It's just a demo to simplify the idea
				eval($script.textContent)
			} catch(err) {
				// Shows the console an error, but won't kill the page
				console.error(`💀 There doesn't appear to be any JavaScript code to run (aaaawkward 😬)`)
			}
			
			// Take down the loading screen, we're done
			document.querySelector('.loading').classList.remove('show')
		})
}


// MOVED THIS TO INDEX.HTML TO LOCALIZE IT, SINCE IT ONLY APPLIES TO THAT PAGE
// let testGoingToLoadthis = (event) => {
// 	loadContentFromHtmlFile('/loadthis.html')
// }
// document.querySelector('#load').addEventListener('click', testGoingToLoadthis)


// Go load content, otherwise, the url bar changes, but nothing happens in the page
let browserHistoryWasModified = (event) => {
	// Go load the page in the url bar
	loadContentFromHtmlFile(window.location.pathname + window.location.hash)
}

// If a user goes "back" or "forward" using browser controls but stays on this page
window.addEventListener('popstate', browserHistoryWasModified)
