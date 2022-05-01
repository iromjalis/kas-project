"use strict";
const haku = document.querySelector('input[id="hakuteksti"]');
const div = document.querySelector('div[id = "tiedot"]');
const body = document.querySelector('body');
let nimi, kuvaus, osoite, kuva, genre;

async function naytaSivu () {

  try {
    // toinen tapa tehdä: const haku = document.getElementById('hakuteksti').value;
    const testi = ` ${haku.value}`
    const vastaus = await fetch(
        'https://api.hel.fi/linkedevents/v1/search/search/?type=event&q=' + testi);
    if (!vastaus.ok) throw new Error('jokin meni pieleen');
    const sivu = await vastaus.json();
    console.log(position);
    tallennaTiedot(sivu);

  } catch (error) {
    console.log(error)
  }
}
async function tallennaTiedot (sivu) {

  for (let i = 0; i< sivu.length; i++) {
    console.log(i);

    genre = sivu[i].show.genres;
    nimi = sivu[i].show.name;
    kuvaus = sivu[i].show.summary;
    osoite = sivu[i].show.officialSite;
    kuva = sivu[i].show.image;

    naytaTiedot();
  }
}
async function naytaTiedot() {

  const article = document.createElement('article');
  const image = document.createElement('img');
  const p = document.createElement('p');
  const name = document.createElement('h2');
  const figure = document.createElement('figure');
  const list = document.createElement('p2');


  if (kuva !=null){
    image.src = kuva.medium;
  }
  name.innerText = nimi;
  p.innerText = osoite;

  if (genre.length!=0){
    for (let i = 0; i < genre.length; i++) {
      const li = document.createElement('p');
      li.innerText += genre[i]+"";
      list.appendChild(li);
    }
  }

  console.log (genre);
  article.appendChild(name);
  article.appendChild(list);
  figure.appendChild(image);
  article.appendChild(figure);
  article.appendChild(p);
  body.appendChild(article);
  article.innerHTML += `${kuvaus}`;

}

const painike = document.querySelector('button');
painike.addEventListener('click', naytaSivu);