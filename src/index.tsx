import * as React from 'react'
import badges from './data.json'

function Badge(
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLImageElement> &
    React.ImgHTMLAttributes<HTMLImageElement> & {
      name: string
      logoColor?: string
      label?: string
    }
) {
  const { name, logoColor, label } = props
  const hex = '#' + badges[name]

  if (logoColor && !isHex(logoColor)) {
    throw new Error('color string isnt hex color')
  }

  const encodedName =
    label || name.replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_')

  const src = encodeURI(
    `https://img.shields.io/badge/${encodedName} -${hex}.svg?&style=for-the-badge&logo=${name}&logoColor=${
      logoColor || 'white'
    }`
  ).replace(/#/g, '%23')

  return <img src={src} alt={props.name} {...props} />
}

const isHex = (color: string): boolean => /^#[0-9A-Fa-f]{6}$/i.test(color)

export default Badge
