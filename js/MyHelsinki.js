"use strict";

//Kaisa on tehnyt fetch, API
const haku = document.querySelector('input[id="hakuteksti"]');
const div = document.querySelector('div[id = "tiedot"]');
const body = document.querySelector("body");
let nimi, kuvaus, osoite, kuva, genre;
const ulRef = document.querySelector(".events-list");
const searchTitle = document.querySelector(".search-title");
let itemLocation;

async function naytaSivu() {
  try {
    const haku = document.getElementById("hakuteksti").value;
    const testi = `${haku}`.trim();
    // const testi = "Helsinki";

    const URL = `https://api.hel.fi/linkedevents/v1/search/?type=event&q=${testi}`;

    const vastaus = await fetch(`${URL}`);

    if (!vastaus.ok) throw new Error("jokin meni pieleen");
    const sivu = await vastaus.json();

    //Irina on tehnyt lisäys sivulle

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
          telephone,
        } = item;

        //Irina on tehnyt tarkastus, jos serverista ei ole mitään tullut

        address_locality ? (address_locality = address_locality.fi) : "No info";
        description
          ? `<p class="events-item-category">${(description =
              description.fi.slice(0, 109) + "...")}</p>`
          : (description = "No info");

        info_url ? (info_url = info_url.fi) : " ";
        name ? (name = name.fi) : " ";
        street_address ? (street_address = street_address.fi) : " ";
        telephone ? (telephone = telephone.fi) : " ";
        email ? `<p class="events-item-email">${email}</p>` : (email = "");
        provider ? (provider = provider.fi) : (provider = "No info");

        //Antonina on tehnyt location ja kartalle onclick funktio
        itemLocation = item.location["@id"];

        return `<li class="events-item"  title="Click to open the map" onclick="window.open('/map.html?${itemLocation}', '_blank');" style="cursor: pointer;">
            <img src=${images[0].url} />
            <h3 class="events-item-title">${provider}</h3>
            ${description}
            ${email}
          </li>`;
      })
      .join(" ");
    //Irina on tehnyt
    searchTitle.classList = "search-title";
    searchTitle.textContent = `Search for "${testi}"`;
    ulRef.innerHTML = markup;

    // Irina on tehnyt auto scroll down
    window.scrollTo({
      top: 700,

      behavior: "smooth",
    });
  } catch (error) {
    console.log(error);
  }
}
const painike = document.querySelector("#searchButton");

painike.addEventListener("click", naytaSivu);

// Irina on tehnyt clicking on footer subscribe button
const footerBtn = document.querySelector("#footerBtn");
const emailInput = document.querySelector("#email");
footerBtn.addEventListener("click", () => {
  if (emailInput && emailInput.value.includes("@")) {
    alert(`Your email: ${emailInput.value} are subscribed! Thank you`);
  }
  alert("Please write your email address clearly once again");
});
