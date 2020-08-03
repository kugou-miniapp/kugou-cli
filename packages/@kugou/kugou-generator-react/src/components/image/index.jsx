import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { resourceLoader } from '@/utils/resource-loader'

export default function KgImage(props) {
  const { src, fallback, ...otherProps } = props
  const [url, setUrl] = useState(fallback)

  useAsync(async () => {
    await resourceLoader.request(src)
    setUrl(src)
  }, [src])

  return (
    <img alt="" src={url} {...otherProps} />
  )
}
