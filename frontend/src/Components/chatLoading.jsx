import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const chatLoading = () => {
  return (
    <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
    </Stack>
  )
}

export default chatLoading