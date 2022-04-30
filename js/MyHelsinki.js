"use strict";
const haku = document.querySelector('input[id="hakuteksti"]');
const div = document.querySelector('div[id = "tiedot"]');
const body = document.querySelector("body");
let nimi, kuvaus, osoite, kuva, genre;

const ulRef = document.querySelector(".events-list");
const searchTitle = document.querySelector(".search-title");
const locationFromApi = "https://api.hel.fi/linkedevents/v1/place/tprek:7606/";

async function naytaSivu() {
  try {
    // toinen tapa tehdä:
    const haku = document.getElementById("hakuteksti").value;

    const testi = `${haku}`;
    console.log("testi: ", testi);

    const URL = `https://api.hel.fi/linkedevents/v1/place/?text=${testi}`;
    console.log("URL: ", URL);

    const vastaus = await fetch(
      "https://api.hel.fi/linkedevents/v1/search/?type=event&q=" + testi
      // `${URL}`
      // `https://api.hel.fi/linkedevents/v1/place/?data_source=tprek`
    );

    if (!vastaus.ok) throw new Error("jokin meni pieleen");
    const sivu = await vastaus.json();
    console.log("sivu: ", sivu);

    const markup = sivu.data
      .map((item) => {
        let {
          address_locality,
          provider,
          email,
          description,
          info_url,

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
              description.fi.slice(0, 300))}</p>`
          : (description = "No info");

        info_url ? (info_url = info_url.fi) : " ";
        name ? (name = name.fi) : " ";
        street_address ? (street_address = street_address.fi) : " ";
        telephone ? (telephone = telephone.fi) : " ";
        email ? `<p class="events-item-email">${email}</p>` : (email = "");
        provider ? (provider = provider.fi) : "No info";

        const mapsGoogle =
          "https://www.google.com/maps/search/" + search_vector_fi;

        return `<li class="events-item">
            <h3 class="events-item-title">${provider}</h3>
            ${description}
            ${email}
          </li>`;
      })
      .join(" ");
    searchTitle.textContent = `Search for "${haku}"`;
    ulRef.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}
const painike = document.querySelector("#button");

painike.addEventListener("click", naytaSivu);
