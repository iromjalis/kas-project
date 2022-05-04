"use strict";
const haku = document.querySelector('input[id="hakuteksti"]');
const div = document.querySelector('div[id = "tiedot"]');
const body = document.querySelector("body");
let nimi, kuvaus, osoite, kuva, genre;
const ulRef = document.querySelector(".events-list");
const searchTitle = document.querySelector(".search-title");
// const locationFromApi = "https://api.hel.fi/linkedevents/v1/place/tprek:7606/";
const video = document.querySelector(".video");
const videoWrapper = document.querySelector(".videoWrapper");
let itemLocation;
async function naytaSivu() {
  try {
    videoWrapper.classList.add("visually-hidden");
    const haku = document.getElementById("hakuteksti").value;
    const testi = `${haku}`.trim();
    // const testi = "Helsinki";
    console.log("testi: ", testi);

    const URL = `https://api.hel.fi/linkedevents/v1/search/?type=event&q=${testi}&page=1
    `;

    const vastaus = await fetch(`${URL}`);

    if (!vastaus.ok) throw new Error("jokin meni pieleen");
    const sivu = await vastaus.json();
    // console.log("sivu: ", sivu.data);

    const markup = sivu.data
      .map((item) => {
        let {
          address_locality,
          provider,
          email,
          description,
          info_url,
          images,
          name,
          street_address,
          postal_code,
          telephone,
          location_extra_info,
          search_vector_fi,
        } = item;
        address_locality ? (address_locality = address_locality.fi) : "No info";
        description
          ? `<p class="events-item-category">${(description =
              description.fi)}</p>`
          : (description = "No info");

        info_url ? (info_url = info_url.fi) : " ";
        name ? (name = name.fi) : " ";
        street_address ? (street_address = street_address.fi) : " ";
        telephone ? (telephone = telephone.fi) : " ";
        email ? `<p class="events-item-email">${email}</p>` : (email = "");
        provider ? (provider = provider.fi) : (provider = "No info");

        //<li class="events-item" onclick="(itemLocation = '${item.location["@id"]}');" data-bs-toggle="modal" data-bs-target="#mapsModal" style="cursor: pointer;">
        itemLocation = item.location["@id"];
        // console.log("itemLocation: ", itemLocation);

        return `<li class="events-item"  title="Click to open the map" onclick="window.open('/map.html?${itemLocation}', '_blank');" style="cursor: pointer;">
            <img src=${images[0].url} />
            <h3 class="events-item-title">${provider}</h3>
            ${description}
            ${email}
          </li>`;
      })
      .join(" ");
    searchTitle.textContent = `Search for "${testi}"`;
    ulRef.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
const painike = document.querySelector("#searchButton");

painike.addEventListener("click", naytaSivu);

// clicking on footer subscribe button
const footerBtn = document.querySelector("#footerBtn");
const emailInput = document.querySelector("#email");
footerBtn.addEventListener("click", () => {
  if (emailInput && emailInput.value.includes("@")) {
    alert(`Your email: ${emailInput.value} are subscribed! Thank you`);
  }
});
