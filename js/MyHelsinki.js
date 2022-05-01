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
       //`${URL}`
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
          //<li class="events-item" onclick="(itemLocation = '${item.location["@id"]}');" data-bs-toggle="modal" data-bs-target="#mapsModal" style="cursor: pointer;">
          let itemLocation = item.location["@id"]
        return `<li class="events-item" onclick="window.open('/map.html?${itemLocation}', '_blank');" style="cursor: pointer;">
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

    /*var myModal = document.getElementById('mapsModal')
    myModal.addEventListener('shown.bs.modal', function (event) {
      setTimeout(()=> {
        map.invalidateSize();
        fetch(itemLocation).then(response=>response.json()).then(result=>{
          mapInfo.innerText = "";
          console.log(result);
          init(result);
        })
      }, 10);
    })*/




    /*let paikka = null;
    
    // tyhjä olio paikannuksen aloittamista ja pysäyttämistä varten
    let paikannus = null;
    
    // zoomtaso
    let zoomlevel = 13;
    
    // liitetään kartta elementtiin #map
    const map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    
    // taulukko markkereita varten
    const markers = L.layerGroup();
    map.addLayer(markers);
    
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    
    // kustom ikonit: oma paikka punainen, latauspiste vihreä
    const punainenIkoni = L.divIcon({className: 'punainen-ikoni'});
    const vihreaIkoni = L.divIcon({className: 'vihrea-ikoni'});
    let mapInfo = document.getElementById("mapInfo");
    mapInfo.innerText = "loading, please wait";
    
    function init(result) {
      markers.clearLayers();
      console.log('markkerit', markers);
      paikka = {
        accuracy: 13,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: result.position.coordinates[1],
        longitude: result.position.coordinates[0],
        speed: null,
      }
      paivitaKartta(paikka);
      lisaaMarker(paikka, 'Olen tässä', punainenIkoni);
      haeLatauspisteet(paikka);
    }
    
    function paivitaKartta(crd) {
      map.setView([crd.latitude, crd.longitude], zoomlevel);
    }
    
    function lisaaMarker(crd, teksti, ikoni) {
      const marker = L.marker([crd.latitude, crd.longitude], {icon: ikoni}).
          bindPopup(teksti).
          on('popupopen', function(popup) {
            navigoi.href = `https://www.google.com/maps/dir/?api=1&origin=${paikka.latitude},${paikka.longitude}&destination=${crd.latitude},${crd.longitude}&travelmode=driving`;
          });
      markers.addLayer(marker);
    }
    
    
    
    map.on('mousedown', function() {
      console.log('paikannus keskeytetty?');
      navigator.geolocation.clearWatch(paikannus);
    });
    
    map.on('zoom', function() {
      zoomlevel = map.getZoom();
      console.log(zoomlevel);
    });
    
    
    function haeLatauspisteet(crd) {
          const teksti = "hello world";
          const koordinaatit = {
            latitude: crd.latitude,
            longitude: crd.longitude,
          };
          lisaaMarker(koordinaatit, teksti, vihreaIkoni);
      }
*/