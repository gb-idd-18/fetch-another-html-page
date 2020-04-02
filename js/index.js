let loadContentFromHtmlFile = (event) => {

	// Put up the loading screen
	document.querySelector('.loading').classList.add('show')

	fetch('loadthis.html')
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
			
			// Take down the loading screen, we're done
			document.querySelector('.loading').classList.remove('show')
		})

}

document.querySelector('#load').addEventListener('click', loadContentFromHtmlFile)
