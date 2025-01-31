import { Image, Stack, HStack, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import IColorPicker from './props';
import Button from './button';
import COLORS from '@/lib/constants';

export default function ColorPicker({
    actualBgColor,
    setBgCardColor,
}: IColorPicker) {
    return (
        <VStack spacing='8px'>
            <Button
                bgColor={'#72FFDD'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#72FFDD')}
                border={
                    actualBgColor === '#72FFDD'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
            <Button
                bgColor={'#4B868E'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#4B868E')}
                border={
                    actualBgColor === '#4B868E'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
            <Button
                bgColor={'#1F1750'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#1F1750')}
                border={
                    actualBgColor === '#1F1750'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
            <Button
                bgColor={'#7E73FF'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#7E73FF')}
                border={
                    actualBgColor === '#7E73FF'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
            <Button
                bgColor={'#C7FF81'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#C7FF81')}
                border={
                    actualBgColor === '#C7FF81'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
            <Button
                bgColor={'#FF73A0'}
                w='24px'
                h='24px'
                handleOnClick={() => setBgCardColor('#FF73A0')}
                border={
                    actualBgColor === '#FF73A0'
                        ? '3px solid ' + COLORS.Primary.value
                        : 'none'
                }
            />
        </VStack>
    );
}
