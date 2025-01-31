import React from 'react';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';
import { Button, useColorModeValue, Text } from '@chakra-ui/react';

const ReactionButton = ({
  value,
  text,
  onClick,
  disabled,
  children
}: {
  value: number;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  children: React.ReactNode;
}) => {
  const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');

  return (
    <>
      <Button
        h={['27px', '30px']}
        px={1}
        bg="transparent"
        border="1px solid transparent"
        _hover={{ bg: useColorModeValue('rgb(0 0 0 / 4%)', 'whiteAlpha.200') }}
        _active={{ bg: 'transparent' }}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </Button>
      <Text fontWeight={400} fontSize="14px" color={ghostColor}>
        {value}{' '}
        {text && (
          <Text as="span" display={{ base: 'none', sm: 'inline-block' }} ms={1}>
            {text}
          </Text>
        )}
      </Text>
    </>
  );
};

const RowReactionButton = ({
  value,
  text,
  onClick,
  disabled,
  displayValue,
  children
}: {
  value: number;
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean;
  displayValue?: boolean;
  children: React.ReactNode;
}) => {
  const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');

  return (
    <Button
      h={['27px', '30px']}
      px={1}
      bg="transparent"
      border="1px solid transparent"
      _hover={{ bg: useColorModeValue('rgb(0 0 0 / 4%)', 'whiteAlpha.200') }}
      _active={{ bg: 'transparent' }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      <Text fontWeight={400} fontSize="14px" color={ghostColor}>
        {displayValue ? value : ''}
        {''}
        {text && (
          <Text as="span" display={{ base: 'none', sm: 'inline-block' }} ms={1}>
            {text}
          </Text>
        )}
      </Text>
    </Button>
  );
};

const LikeIcon = ({ state, size }) => {
  const Heart = state ? AiFillHeart : AiOutlineHeart;
  const zColor = state ? 'red' : '#3d3d3d';
  return (
    <Heart
      size={size}
      color={zColor}
      fill="currentColor"
      stroke="currentColor"
      style={{ cursor: 'pointer' }}
    />
  );
};

const BookmarkIcon = ({ state, size }) => {
  const Bookmark = state ? FaBookmark : FaRegBookmark;
  const zColor = state ? 'blue' : '#3d3d3d';
  return (
    <Bookmark
      size={size}
      color={zColor}
      fill="currentColor"
      stroke="currentColor"
      style={{ cursor: 'pointer' }}
    />
  );
};

const HeartIcon = ({ fill }) => {
  return (
    <svg
      fill={fill}
      className="crayons-icon"
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
    </svg>
  );
};

const IconBadge = ({ value }) => {
  return (
    <Text
      bg={useColorModeValue('rgb(212 212 212)', 'rgb(82 82 82)')}
      color={useColorModeValue('rgb(64 64 64)', 'rgb(229 229 229)')}
      fontSize="13px"
      px="5px"
      borderRadius="5px"
      display="inline-block"
    >
      {value}
    </Text>
  );
};

export { HeartIcon, IconBadge, LikeIcon, BookmarkIcon, ReactionButton, RowReactionButton };
