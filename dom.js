"use strict";

// Elemente Erzeugen
const dom = {
  create(
    inhalt = false,
    parent = false,
    typ = "div",
    klasse = false,
    src = false,
    data_index = false,
    value = false
  ) {
    const neuesElement = document.createElement(typ);
    if (inhalt) neuesElement.innerHTML = inhalt;
    if (klasse) neuesElement.className = klasse;
    if (value) neuesElement.value = value;
    if (parent) parent.append(neuesElement);
    if (src) neuesElement.src = src;
    if (data_index) neuesElement.dataset.index = data_index;
    return neuesElement;
  },
  sel(selector) {
    return document.querySelector(selector);
  },
  selAll(selector) {
    return Array.from(document.querySelectorAll(selector));
  },
};
