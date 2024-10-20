
/**********************************************************************************/
/****                               DOM                                       *****/
/**********************************************************************************/

/**
 * Utility function to create and insert a new DOM element.
 *
 * @param {string} type - The type of element to create (e.g., 'div', 'span', 'p').
 * @param {Object} options - Options to customize the element.
 * @param {string[]} [options.classes] - Array of classes to add to the element.
 * @param {string} [options.id] - ID to assign to the element.
 * @param {HTMLElement} [options.parent] - The parent element to append/prepend the new element to.
 * @param {boolean} [options.prepend=false] - Whether to prepend the element instead of appending. Append by default.
 * @param {Object} [options.attributes] - Additional attributes to add to the element (e.g., { src: 'image.png', alt: 'Image description' }).
 * @param {String} [options.innerHTML] - innerHTML, if any
 * @param {string} [options.textContent] - Text content to set for the element.
 * @returns {HTMLElement} The created DOM element.
 */
function createElement(type, options = {}) {
  const element = document.createElement(type);

  // Add classes if provided
  if (options.classes) {
    element.classList.add(...options.classes);
  }

  // Add id if provided
  if (options.id) {
    element.id = options.id;
  }

  // Add additional attributes if provided
  if (options.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      element.setAttribute(key, value);
    }
  }

  // Set text content if provided
  if (options.textContent) {
    element.textContent = options.textContent;
  }

  // Set innerHtml if provided
  if (options.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  // Append or prepend to parent if provided
  if (options.parent) {
    if (options.prepend) {
      options.parent.prepend(element);
    } else {
      options.parent.append(element);
    }
  }

  return element;
}

/// subfunction for hide, show, etc.
function runMainFunction(el, string, func) {
  if (el instanceof HTMLCollection || el instanceof NodeList) {
    Array.from(el).forEach(func);
  } else {
    func(el);
  }
}

/// hide entire HTML collections, nodes, or single elements by adding class 'nodisplay'
 function hide(el) {
  const func = (element) => {
    if (!element.classList.contains("nodisplay")) {
      element.classList.add("nodisplay");
    }
  };

  runMainFunction(el, null, func);
}

/// show entire HTML collections, nodes, or single elements by adding class 'nodisplay'
 function show(el) {
  const func = (element) => {
    element.classList.remove("nodisplay");
  };

  runMainFunction(el, null, func);
}

/// add class 'string' to HTML collections, nodes, or single elements
 function addClass(el, string) {
  const func = (element) => {
    if (!element.classList.contains(string)) {
      element.classList.add(string);
    }
  };

  runMainFunction(el, string, func);
}

/// remove a class 'string' to HTML collections, nodes, or single elements
 function removeClass(el, string) {
  const func = (element) => {
    element.classList.remove(string);
  };

  runMainFunction(el, string, func);
}

/// toggle class 'string' of HTML collections, nodes, or single elements
 function toggleClass(el, string) {
  const func = (element) => {
    element.classList.toggle(string);
  };

  runMainFunction(el, string, func);
}

// disable HTML collections, nodes, or single elements
 const disable = (el) => {
  const func = (element) => {
    element.disabled = true;
  };

  runMainFunction(el, null, func);
};

// enable HTML collections, nodes, or single elements
 const enable = (el) => {
  const func = (element) => {
    element.disabled = false;
  };

  runMainFunction(el, null, func);
};

// prepend HTML to HTML collections, nodes, or single elements
 const prepend = (el, html, position) => {
  position = position || "afterbegin";
  if (position === "beforebegin" || position === "afterbegin") {
    const func = (element) => {
      element.insertAdjacentHTML(position, html);
    };
    if (HTMLCollection.prototype.isPrototypeOf(el)) {
      [...el].forEach((element) => func(element));
    } else if (Array.isArray(el) || NodeList.prototype.isPrototypeOf(el)) {
      el.forEach((element) => func(element));
    } else {
      func(el);
    }
  } else {
    error(`Error: prepend() -- could not recognize position '${position}'.`);
  }
};

// append HTML to HTML collections, nodes, or single elements
 const append = (el, html, position) => {
  position = position || "beforeend";
  if (position === "beforeend" || position === "afterend") {
    const func = (element) => {
      element.insertAdjacentHTML(position, html);
    };
    if (HTMLCollection.prototype.isPrototypeOf(el)) {
      [...el].forEach((element) => func(element));
    } else if (Array.isArray(el) || NodeList.prototype.isPrototypeOf(el)) {
      el.forEach((element) => func(element));
    } else {
      func(el);
    }
  } else {
    error(`Error: append() -- could not recognize position '${position}'.`);
  }
};

/**********************************************************************************/
/****                               MATH                                      *****/
/**********************************************************************************/
 function getRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

 function getRandomExclusive(min, max) {
  if (max - min <= 2) {
    throw new Error("Range is too small to exclude min and max.");
  }
  return Math.floor(Math.random() * (max - min - 1)) + min + 1;
}

/**********************************************************************************/
/****                             TIME/DATE                                   *****/
/**********************************************************************************/
 function getCurrentDateTime() {
  return new Date();
}

 function formatDate(date, format = "YYYY-MM-DD") {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  switch (format) {
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD/MM/YYYY":
      return `${day}/${month}/${year}`;
    default:
      return `${year}-${month}-${day}`;
  }
}

 function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

 function dateDifferenceInDays(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  return Math.round((date2 - date1) / oneDay);
}

// YYYY-MM-DD
 function parseDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**********************************************************************************/
/****                         ARRAYS AND OBJECTS                              *****/
/**********************************************************************************/

// shuffle an array
 function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

/**********************************************************************************/
/****                          DEV ONLY                                       *****/
/**********************************************************************************/

// log, using the module name
 const log = (msg, val) => {
  if (typeof msg === "array" || typeof msg === "object") {
    for (let i = 0; i < msg.length; i++) {
      if (i % 2 != 0) {
        console.log(`[${MY_APP}] ${msg[i - 1]} = ${msg[i]}`);
      }
    }
  } else if (val) {
    console.log(`[${MY_APP}] ${msg} = ${val}`);
  } else {
    console.log(`[${MY_APP}] ${msg}`);
  }
};

 const error = (msg) => {
  console.error(`[${MY_APP}] ${msg}`);
};