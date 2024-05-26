import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export default function ChatLoading() {
  return (
    <Stack>
    <Skeleton height='20px' />
    <Skeleton height='20px' />
    <Skeleton height='20px' />
  </Stack>
  )
}
