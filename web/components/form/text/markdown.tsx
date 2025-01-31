import {
  Box,
  Code,
  Heading,
  Link,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";

type NormalComponentsProps = {
  [TagName in keyof JSX.IntrinsicElements]?: CSSProperties;
};
type SpecialComponentsProps = {
  [TagName in keyof SpecialComponents]?: CSSProperties;
};
type MarkdownProps = {
  children: string;
  style?: NormalComponentsProps & SpecialComponentsProps;
};

export function Markdown({ children, style }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        a: ({ node, ...props }) => (
          <Link {...props} color="primary.500" style={{ ...style?.a }} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote
            {...props}
            style={{
              paddingLeft: "20px",
              borderLeft: "4px solid var(--chakra-colors-base-20)",
              ...style?.blockquote,
            }}
          />
        ),
        code: ({ node, inline, ...props }) => (
          <Code
            {...props}
            px="1"
            borderRadius="md"
            bg="rgba(0, 0, 0, 0.1)"
            fontSize="80%"
            color="inherit"
            style={{ ...style?.code }}
          />
        ),
        h1: ({ node, ...props }) => (
          <Heading as="h1" {...props} fontSize="4xl" style={{ ...style?.h1 }} />
        ),
        h2: ({ node, ...props }) => (
          <Heading
            as="h2"
            {...props}
            fontSize={{ base: "27px", lg: "3xl" }}
            style={{ ...style?.h2 }}
          />
        ),
        h3: ({ node, ...props }) => (
          <Heading as="h3" {...props} fontSize="2xl" style={{ ...style?.h3 }} />
        ),
        h4: ({ node, ...props }) => (
          <Heading as="h4" {...props} fontSize="xl" style={{ ...style?.h4 }} />
        ),
        h5: ({ node, ...props }) => (
          <Heading as="h5" {...props} fontSize="lg" style={{ ...style?.h5 }} />
        ),
        h6: ({ node, ...props }) => (
          <Heading as="h6" {...props} fontSize="md" style={{ ...style?.h6 }} />
        ),
        ol: ({ node, ordered, ...props }) => {
          const { depth } = props;
          return (
            <OrderedList
              {...props}
              fontSize="xl"
              styleType={
                depth === 0 ? "1" : depth === 1 ? "lower-alpha" : "lower-roman"
              }
              style={{ ...style?.ol }}
            />
          );
        },
        p: ({ node, ...props }) => (
          <Text
            {...props}
            fontSize={{ base: "lg", lg: "xl" }}
            style={{ ...style?.p }}
          />
        ),
        pre: ({ node, ...props }) => (
          <Box
            p="5"
            borderRadius="md"
            bg="#08090a"
            color="#f8f8f2"
            fontSize="xl"
          >
            <pre {...props} style={{ overflow: "auto", ...style?.pre }} />
          </Box>
        ),
        ul: ({ node, ordered, ...props }) => (
          <UnorderedList
            {...props}
            fontSize={{ base: "lg", lg: "xl" }}
            style={{ ...style?.ul }}
          />
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
