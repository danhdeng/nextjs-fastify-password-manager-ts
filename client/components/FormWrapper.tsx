import React from 'react'

import {Box, BoxProps} from "@chakra-ui/react";

export default function FormWrapper({
  children,
  ...props
}:{children: React.ReactNode} & BoxProps) {
  return (
    <Box w="100%" maxW="container.sm" boxShadow="xl" p="8" as="form" { ...props }>          
      {children}
    </Box>
  )
}
