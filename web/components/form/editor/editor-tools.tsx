// import {
  // BiCode,
  // BiCodeBlock,
  // BiHeading,
  // BiVerticalCenter,
// } from "react-icons/bi";

import { BiCode } from '@react-icons/all-files/bi/BiCode';
import { BiCodeBlock } from '@react-icons/all-files/bi/BiCodeBlock';
import { BiHeading } from '@react-icons/all-files/bi/BiHeading';
import { BiVerticalCenter } from '@react-icons/all-files/bi/BiVerticalCenter';

// import {
  // MdFormatBold,
  // MdFormatItalic,
  // MdFormatListBulleted,
  // MdFormatListNumbered,
  // MdFormatQuote,
  // MdFormatUnderlined,
  // MdHelp,
  // MdImage,
  // MdLink,
  // MdStrikethroughS,
// } from "react-icons/md";

import { MdFormatBold } from '@react-icons/all-files/md/MdFormatBold';
import { MdFormatItalic } from '@react-icons/all-files/md/MdFormatItalic';
import { MdFormatListBulleted } from '@react-icons/all-files/md/MdFormatListBulleted';
import { MdFormatListNumbered } from '@react-icons/all-files/md/MdFormatListNumbered';
import { MdFormatQuote } from '@react-icons/all-files/md/MdFormatQuote';
import { MdFormatUnderlined } from '@react-icons/all-files/md/MdFormatUnderlined';
import { MdHelp } from '@react-icons/all-files/md/MdHelp';
import { MdImage } from '@react-icons/all-files/md/MdImage';
import { MdLink } from '@react-icons/all-files/md/MdLink';
import { MdStrikethroughS } from '@react-icons/all-files/md/MdStrikethroughS';




export const EditorToolsData = {
  BOLD: { label: "Bold", icon: <MdFormatBold /> },
  ITALIC: { label: "Italic", icon: <MdFormatItalic /> },
  LINK: { label: "Link", icon: <MdLink /> },
  ORDERED_LIST: { label: "Ordered list", icon: <MdFormatListBulleted /> },
  UNORDERED_LIST: { label: "Unordered list", icon: <MdFormatListNumbered /> },
  HEADING: { label: "Heading", icon: <BiHeading /> },
  QUOTE: { label: "Quote", icon: <MdFormatQuote /> },
  IMAGE: { label: "Image", icon: <MdImage /> },
  CODE: { label: "Code", icon: <BiCode /> },
  CODE_BLOCK: { label: "Code block", icon: <BiCodeBlock /> },
  UNDERLINE: { label: "Underline", icon: <MdFormatUnderlined /> },
  STRIKETHROUGH: { label: "Strikethrough", icon: <MdStrikethroughS /> },
  LINE_DIVIDER: { label: "Line divider", icon: <BiVerticalCenter /> },
  HELP: { label: "Help", icon: <MdHelp /> },
};

export type EditorTool = keyof typeof EditorToolsData;

export const DEFAULT_EDITOR_TOOLS: EditorTool[] = [
  "BOLD",
  "ITALIC",
  "LINK",
  "ORDERED_LIST",
  "UNORDERED_LIST",
  "HEADING",
  "QUOTE",
  "IMAGE",
  "CODE",
  "CODE_BLOCK",
  "UNDERLINE",
  "STRIKETHROUGH",
  "LINE_DIVIDER",
  "HELP",
];
