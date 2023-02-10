import { Image } from 'react-native'
import React from 'react'

export default function Avatar({ ID, style }) {
    return (
          <Image source={{ uri: AvatarLinks((ID - 1) % 20) }} style={[{ resizeMode: "contain" }, style]} />
    )
}

const AvatarLinks = (ID) => {
  return `https://xsgames.co/randomusers/assets/avatars/male/${ID}.jpg`
}