import { Image } from 'react-native'
import React from 'react'

export default function Avatar({ ID, style }) {
    return (
          <Image source={{ uri: AvatarLinks[(ID - 1) % 20] }} style={[{ resizeMode: "contain" }, style]} />
    )
}

const AvatarLinks = JSON.parse(`[{
    "id": 1,
    "avatar": "https://robohash.org/molestiaeimpeditdolor.png?size=500x500&set=set1"
  }, {
    "id": 2,
    "avatar": "https://robohash.org/nonteneturexplicabo.png?size=500x500&set=set1"
  }, {
    "id": 3,
    "avatar": "https://robohash.org/etfugiatdebitis.png?size=500x500&set=set1"
  }, {
    "id": 4,
    "avatar": "https://robohash.org/enimdoloriusto.png?size=500x500&set=set1"
  }, {
    "id": 5,
    "avatar": "https://robohash.org/impeditnesciuntofficia.png?size=500x500&set=set1"
  }, {
    "id": 6,
    "avatar": "https://robohash.org/quiavoluptatesconsequatur.png?size=500x500&set=set1"
  }, {
    "id": 7,
    "avatar": "https://robohash.org/consequaturessenobis.png?size=500x500&set=set1"
  }, {
    "id": 8,
    "avatar": "https://robohash.org/totamquiut.png?size=500x500&set=set1"
  }, {
    "id": 9,
    "avatar": "https://robohash.org/doloremqueeaodio.png?size=500x500&set=set1"
  }, {
    "id": 10,
    "avatar": "https://robohash.org/etsitaut.png?size=500x500&set=set1"
  }, {
    "id": 11,
    "avatar": "https://robohash.org/essesimiliquein.png?size=500x500&set=set1"
  }, {
    "id": 12,
    "avatar": "https://robohash.org/autlaborequis.png?size=500x500&set=set1"
  }, {
    "id": 13,
    "avatar": "https://robohash.org/quisvoluptatemet.png?size=500x500&set=set1"
  }, {
    "id": 14,
    "avatar": "https://robohash.org/nullalaborumin.png?size=500x500&set=set1"
  }, {
    "id": 15,
    "avatar": "https://robohash.org/similiqueetdolore.png?size=500x500&set=set1"
  }, {
    "id": 16,
    "avatar": "https://robohash.org/autliberosuscipit.png?size=500x500&set=set1"
  }, {
    "id": 17,
    "avatar": "https://robohash.org/deseruntrepellatfacere.png?size=500x500&set=set1"
  }, {
    "id": 18,
    "avatar": "https://robohash.org/reiciendisrepudiandaeid.png?size=500x500&set=set1"
  }, {
    "id": 19,
    "avatar": "https://robohash.org/etnequeiste.png?size=500x500&set=set1"
  }, {
    "id": 20,
    "avatar": "https://robohash.org/omnistotamrerum.png?size=500x500&set=set1"
  }]`).map(a => a.avatar)