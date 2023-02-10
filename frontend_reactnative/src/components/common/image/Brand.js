import {View, Text} from 'react-native';
import React from 'react';

export default function BrandLogo({ID, style}) {
  return (
    <View>
      <Image
        source={{uri: logo[(ID - 1) % 145]}}
        style={[{resizeMode: 'contain'}, style]}
      />
    </View>
  );
}

const logo = JSON.parse(
  `[
    {
      "id": 1,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Aprilia.png"
    },
    {
      "id": 2,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Bajaj.png"
    },
    {
      "id": 3,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Benelli.png"
    },
    {
      "id": 4,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/BMW.png"
    },
    {
      "id": 5,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Brixtion.png"
    },
    {
      "id": 6,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/CPI.png"
    },
    {
      "id": 7,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/CR%26S.png"
    },
    {
      "id": 8,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Daelim.png"
    },
    {
      "id": 9,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Ducati.png"
    },
    {
      "id": 10,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Euro+Reibel.png"
    },
    {
      "id": 11,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Generic.png"
    },
    {
      "id": 12,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Halim.png"
    },
    {
      "id": 13,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Harley+Davidson.png"
    },
    {
      "id": 14,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Hero.png"
    },
    {
      "id": 15,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Honda.png"
    },
    {
      "id": 16,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Hyosung.png"
    },
    {
      "id": 17,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Kawasaki.png"
    },
    {
      "id": 18,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Keeway.png"
    },
    {
      "id": 19,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Kengo.png"
    },
    {
      "id": 20,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/KTM.png"
    },
    {
      "id": 21,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Kymco.png"
    },
    {
      "id": 22,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Lambretta.png"
    },
    {
      "id": 23,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Malaguti.png"
    },
    {
      "id": 24,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Mobylette.png"
    },
    {
      "id": 25,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Moto+Guzzi.png"
    },
    {
      "id": 26,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/MV+Augusta.png"
    },
    {
      "id": 27,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Norton.png"
    },
    {
      "id": 28,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Peugeot.png"
    },
    {
      "id": 29,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Piaggio.png"
    },
    {
      "id": 30,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/RebelUSA.png"
    },
    {
      "id": 31,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Regal+Raptor.png"
    },
    {
      "id": 32,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Sachs.png"
    },
    {
      "id": 33,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Sanda.png"
    },
    {
      "id": 34,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Suzuki.png"
    },
    {
      "id": 35,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/SYM.png"
    },
    {
      "id": 36,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Triumph.png"
    },
    {
      "id": 37,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Vento.png"
    },
    {
      "id": 38,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Victory.png"
    },
    {
      "id": 39,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Visitor.png"
    },
    {
      "id": 40,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Yamaha.png"
    },
    {
      "id": 41,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Visitor.png"
    },
    {
      "id": 42,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Asama.png"
    },
    {
      "id": 43,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/ASISTA+Bmm.png"
    },
    {
      "id": 44,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Huyndai.png"
    },
    {
      "id": 45,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Suzika.png"
    },
    {
      "id": 46,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Aima.png"
    },
    {
      "id": 47,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Dkbike.png"
    },
    {
      "id": 48,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Draca.png"
    },
    {
      "id": 49,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/ANBICO+DINA.png"
    },
    {
      "id": 50,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/ANBICO.png"
    },
    {
      "id": 51,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before+All.png"
    },
    {
      "id": 52,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Dibao.png"
    },
    {
      "id": 53,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/HTC.png"
    },
    {
      "id": 54,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Giant.png"
    },
    {
      "id": 55,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/DTP.png"
    },
    {
      "id": 56,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Espero.png"
    },
    {
      "id": 57,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Everest.png"
    },
    {
      "id": 58,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/FMT.png"
    },
    {
      "id": 59,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Gianya.png"
    },
    {
      "id": 60,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Hola.png"
    },
    {
      "id": 61,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Nishiki.png"
    },
    {
      "id": 62,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Sonsu.png"
    },
    {
      "id": 63,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Gedesheng.png"
    },
    {
      "id": 64,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Fuji.png"
    },
    {
      "id": 65,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Hkbike.png"
    },
    {
      "id": 66,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Osakar.png"
    },
    {
      "id": 67,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Zoomer.png"
    },
    {
      "id": 68,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Jili.png"
    },
    {
      "id": 69,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Mocha.png"
    },
    {
      "id": 70,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Nijia.png"
    },
    {
      "id": 71,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Pega.png"
    },
    {
      "id": 72,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Sufat.png"
    },
    {
      "id": 73,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Takuda.png"
    },
    {
      "id": 74,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Byvin.png"
    },
    {
      "id": 75,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Emoto.png"
    },
    {
      "id": 76,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/JVC+eco.png"
    },
    {
      "id": 77,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Seeyes.png"
    },
    {
      "id": 78,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Vi%E1%BB%87t+Th%C3%A1i.png"
    },
    {
      "id": 79,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Yadea.png"
    },
    {
      "id": 80,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/CMV.png"
    },
    {
      "id": 81,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/EV.png"
    },
    {
      "id": 82,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Vinfast.png"
    },
    {
      "id": 83,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/DYU.png"
    },
    {
      "id": 84,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Lyva.png"
    },
    {
      "id": 85,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Kingda.png"
    },
    {
      "id": 86,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Ecobike.png"
    },
    {
      "id": 87,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Nike+bike.png"
    },
    {
      "id": 88,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Tenbike.png"
    },
    {
      "id": 89,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Haybike.png"
    },
    {
      "id": 90,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Dragon.png"
    },
    {
      "id": 91,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Michi.png"
    },
    {
      "id": 92,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Ecooter.png"
    },
    {
      "id": 93,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Niu.png"
    },
    {
      "id": 94,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/ETC.png"
    },
    {
      "id": 95,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/GPX.png"
    },
    {
      "id": 96,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Royal+Enfield.png"
    },
    {
      "id": 97,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Sunny.png"
    },
    {
      "id": 98,
      "logo": "https://cdn.okxe.vn/moto/logo/active/PK.png"
    },
    {
      "id": 99,
      "logo": "https://cdn.okxe.vn/moto/logo/active/The%20Design%20Tiger.png"
    },
    {
      "id": 100,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/HTbike.png"
    },
    {
      "id": 102,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/LTP.png"
    },
    {
      "id": 104,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/TL+bike.png"
    },
    {
      "id": 105,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Martin.png"
    },
    {
      "id": 106,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Yasuki.png"
    },
    {
      "id": 107,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Ava.png"
    },
    {
      "id": 108,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Hitasa.png"
    },
    {
      "id": 110,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Covingtons.png"
    },
    {
      "id": 114,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/T-bike.png"
    },
    {
      "id": 115,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Bridgestone.png"
    },
    {
      "id": 116,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1626162982.png"
    },
    {
      "id": 117,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1626690942.png"
    },
    {
      "id": 118,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1626691252.png"
    },
    {
      "id": 119,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1626692067.png"
    },
    {
      "id": 120,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1634533522.png"
    },
    {
      "id": 121,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1634710030.png"
    },
    {
      "id": 122,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1635156603.png"
    },
    {
      "id": 123,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 124,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1635477179.png"
    },
    {
      "id": 125,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 126,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 127,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 128,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 129,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 130,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 132,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 134,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1636961118.png"
    },
    {
      "id": 135,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 136,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 137,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 138,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 139,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 140,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 141,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 143,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 144,
      "logo": "https://cdn.okxe.vn/moto/logo/active/2021/Before.png"
    },
    {
      "id": 145,
      "logo": "https://cdn.okxe.vn/moto/logo/active/linh_1639388345.png"
    }
  ]`,
).map(item => item.logo);
