function detectDeviceType() {
	const userAgent = navigator.userAgent.toLowerCase();
	const mobileRegex = /iphone|ipod|android.*mobile|blackberry|opera mini|windows phone|webos/i;
	const tabletRegex = /ipad|android(?!.*mobile)|tablet|kindle|silk|playbook/i;

	if (mobileRegex.test(userAgent)) {
		return "Mobile";
	} else if (tabletRegex.test(userAgent)) {
		return "Tablet";
	} else {
		return "Desktop";
	}
}

function getScreenSize() {
	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
}

function getPixelRatio() {
	return parseFloat((window.devicePixelRatio || 1).toFixed(3));
}

function getOrientation() {
	if (window.matchMedia("(orientation: portrait)").matches) {
		return "Portrait";
	} else if (window.matchMedia("(orientation: landscape)").matches) {
		return "Landscape";
	} else {
		return "Unknown";
	}
}

const init = () => {
	console.log("The DOM is loaded.");

	const deviceType = detectDeviceType();
	const screenSize = getScreenSize();
	const pixelRatio = getPixelRatio();
	const orientation = getOrientation();

	document.getElementById("deviceType").textContent = deviceType;
	document.getElementById("screenSize").textContent = `${screenSize.width}x${screenSize.height}`;
	document.getElementById("pixelRatio").textContent = pixelRatio;
	document.getElementById("orientation").textContent = orientation;
};

document.addEventListener("DOMContentLoaded", () => init());
