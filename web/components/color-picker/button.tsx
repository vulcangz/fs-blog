import { Button as ChakraButton, HStack } from '@chakra-ui/react';
import React from 'react';
import { IButton } from './props';

export default function Button({
    children,
    h,
    w,
    handleOnClick,
    startEnhancer,
    endEnhancer,
    spacing = '0px',
    ...rest
}: IButton) {
    return (
        <HStack
            h={h}
            w={w}
            borderStyle='none'
            borderRadius='18px'
            boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
            justifyContent={'center'}
            alignItems={'center'}
            _hover={{
                filter: 'saturate(80%)',
            }}
            onClick={handleOnClick}
            spacing={spacing}
            {...rest}
        >
            {startEnhancer}
            {children}
            {endEnhancer}
        </HStack>
    );
}
