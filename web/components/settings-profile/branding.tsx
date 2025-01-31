import { Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  titleStyles,
  SettingsProfileCard,
  SmallLabel,
  Label
} from '@/components/misc/settings-profile-style';
import ColorPicker from '@/components/color-picker';
import useClickOutside from '@/hooks/global/use-click-outside';
import { EditProfile } from '@/interfaces';
import { useFormContext } from 'react-hook-form';
import COLORS from '@/lib/constants';

const Branding = () => {
  const { getValues, register } = useFormContext<EditProfile>();

  const [brandColor, setBrandColor] = useState(getValues('background') || '#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [actualBgColor, setActualBgColor] = useState(COLORS.TextDark.T25.value);

  const handleChange = (color) => {
    setBrandColor(color.hex);
  };

  //handle click outside to close color picker
  useClickOutside(setShowColorPicker, [
    'color-board',
    'saturation-white',
    'saturation-black',
    'hue-horizontal',
    ''
  ]);

  return (
    <SettingsProfileCard>
      <Text {...titleStyles}>Branding</Text>

      <Box>
        <Box>
          <Label>Brand color</Label>
          <SmallLabel>Used for backgrounds, borders etc.</SmallLabel>

          <Box
            w="100%"
            pos="relative"
            display="flex"
            alignItems="center"
            sx={{
              '.chrome-picker': {
                position: 'absolute',
                zIndex: 3,
                top: '2.8rem'
              },
              '.chrome-picker .flexbox-fix:last-child': {
                display: 'none !important'
              },
              '.flexbox-fix:first-of-type > div:last-child > div:last-child': {
                display: 'none !important'
              },
              '.flexbox-fix:first-of-type > div:first-of-type': {
                display: 'none !important'
              }
            }}
          >
            {showColorPicker && (
              <ColorPicker actualBgColor={brandColor} setBgCardColor={setBrandColor} />
            )}

            <Flex
              h="40px"
              w="45px"
              pos="absolute"
              zIndex={2}
              ps=".3rem"
              cursor="pointer"
              align="center"
            >
              <Box
                bg={brandColor}
                height="33px"
                w="100%"
                borderRadius="5px"
                className="color-board"
                border=".5px solid rgb(64 64 64)"
              />
            </Flex>

            <Input {...register('brand_color1')} type="text" ps="55px" value={brandColor} />
          </Box>
        </Box>
      </Box>
    </SettingsProfileCard>
  );
};

export default Branding;
