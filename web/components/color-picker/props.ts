import {
    ButtonProps,
    StackDirection,
    HStack,
    StackProps,
} from '@chakra-ui/react';

export default interface IColorPicker extends StackProps {
    actualBgColor: string;
    setBgCardColor: (color: string) => void;
}

export interface IButton extends Omit<StackProps, 'children'> {
    children?: React.ReactElement | string;
    startEnhancer?: React.ReactElement;
    endEnhancer?: React.ReactElement;
    handleOnClick?: () => void;
}