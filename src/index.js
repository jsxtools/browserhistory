export default function BrowserHistory (window) {
	var self = this
	var history = window.history
	var location = window.location

	self.canGo = canGo
	self.currentIndex = 0
	self.currentURL = location.href
	self.go = go
	self.push = push
	self.replace = replace
	self.urls = [self.currentURL]

	window.addEventListener('popstate', onpopstate)

	replace(self.currentURL)

	function canGo (delta) {
		return self.currentIndex + delta in self.urls
	}

	function go (delta) {
		if (canGo(delta)) {
			history.go(delta)
		}

		return self
	}

	function push (url) {
		history.pushState(++self.currentIndex, '', url)

		self.currentURL = self.urls[self.currentIndex] = location.href

		return self
	}

	function replace (url) {
		history.replaceState(self.currentIndex, '', url)

		self.currentURL = self.urls[self.currentIndex] = location.href

		return self
	}

	function onpopstate () {
		var currentIndex = history.state
		var isValidIndex = typeof currentIndex === 'number' && currentIndex in self.urls

		if (isValidIndex) {
			self.currentIndex = currentIndex

			self.urls[currentIndex] = location.href
		}

		return self
	}
}
