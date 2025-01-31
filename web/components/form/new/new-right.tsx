import {
  Box,
  Code,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  UnorderedList
} from '@chakra-ui/react';
import { useContext } from 'react';
import { EditPost } from '@/interfaces';
import { NewSuggestionContext } from './suggestion-context';

type CommonEffectProps = {
  children: React.ReactNode;
  field: Exclude<keyof EditPost, 'coverImage'>;
};

function CommonEffect({ children, field }: CommonEffectProps) {
  const { suggestionField } = useContext(NewSuggestionContext);
  const display = suggestionField?.name === field;

  return (
    <Box
      h={display ? 'auto' : 0}
      visibility={display ? 'visible' : 'hidden'}
      opacity={display ? 1 : 0}
      transform={display ? 'translateY(0)' : 'translateY(-10px)'}
      transition="all 300ms, visibility 0ms"
    >
      {children}
    </Box>
  );
}

function TitleSuggestion() {
  return (
    <CommonEffect field="title">
      <Heading key="new-right-title-1" mb="2" fontSize="lg">
        Writing a Great Post Title
      </Heading>
      <UnorderedList key="new-right-title-2" color="base.70">
        <ListItem>
          Think of your post title as a super short (but compelling!) description — like an overview
          of the actual post in one short sentence.
        </ListItem>
        <ListItem>
          Use keywords where appropriate to help ensure people can find your post by search.
        </ListItem>
      </UnorderedList>
    </CommonEffect>
  );
}

function TagsSuggestion() {
  return (
    <CommonEffect field="tags">
      <Heading mb="2" fontSize="lg">
        Tagging Guidelines
      </Heading>
      <UnorderedList color="base.70">
        <ListItem>Tags help people find your post.</ListItem>
        <ListItem>Think of tags as the topics or categories that best describe your post.</ListItem>
        <ListItem>
          Add up to four comma-separated tags per post. Combine tags to reach the appropriate
          subcommunities.
        </ListItem>
        <ListItem>Use existing tags whenever possible.</ListItem>
        <ListItem>
          Some tags, such as “help” or “healthydebate”, have special posting guidelines.
        </ListItem>
      </UnorderedList>
    </CommonEffect>
  );
}

function BodySuggestion() {
  return (
    <CommonEffect field="content">
      <Heading mb="2" fontSize="lg">
        Editor Basics
      </Heading>
      <UnorderedList color="base.70">
        <ListItem>
          Use{' '}
          <Link href="https://www.markdownguide.org/basic-syntax/" isExternal color="blue">
            Markdown
          </Link>{' '}
          to write and format posts.
          <Box as="details" my="1">
            <Box as="summary" fontSize="sm" cursor="pointer">
              Commonly used syntax
            </Box>
            <Table size="new-suggestion" mt="2" mb="4">
              <Tbody>
                <Tr>
                  <Td fontFamily="monospace">
                    # Header
                    <br />
                    ...
                    <br />
                    ###### Header
                  </Td>
                  <Td>
                    H1 Header
                    <br />
                    ...
                    <br />
                    H6 Header
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">*italics* or _italics_</Td>
                  <Td>
                    <em>italics</em>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">**bold**</Td>
                  <Td>
                    <strong>bold</strong>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">[Link](https://...)</Td>
                  <Td>
                    <Link href="/" color="blue">
                      Link
                    </Link>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">
                    * item 1<br />* item 2
                  </Td>
                  <Td>
                    <UnorderedList styleType="disc">
                      <ListItem>item 1</ListItem>
                      <ListItem>item 2</ListItem>
                    </UnorderedList>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">
                    1. item 1<br />
                    2. item 2
                  </Td>
                  <Td>
                    <OrderedList>
                      <ListItem>item 1</ListItem>
                      <ListItem>item 2</ListItem>
                    </OrderedList>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">&gt; quoted text</Td>
                  <Td>
                    <Text as="span" pl="2" borderLeft="2px solid" borderColor="base.50">
                      quoted text
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">`inline code`</Td>
                  <Td>
                    <Code borderRadius="md" bg="rgba(0, 0, 0, 0.1)" fontSize="xs">
                      inline code
                    </Code>
                  </Td>
                </Tr>
                <Tr>
                  <Td fontFamily="monospace">
                    <Text fontSize="xs">```</Text>
                    code block
                    <Text fontSize="xs">```</Text>
                  </Td>
                  <Td>
                    <Box p="2" borderRadius="md" bg="black" verticalAlign="middle">
                      <Code bg="rgba(0, 0, 0, 0.1)" color="white" fontSize="xs">
                        code block
                      </Code>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </ListItem>
        <ListItem>
          Embed rich content such as Tweets, YouTube videos, etc. Use the complete URL:{' '}
          <Code borderRadius="md" bg="rgba(0, 0, 0, 0.1)" fontSize="xs">
            &#123;% embed https://... %&#125;
          </Code>
          . <Link color="blue">See a list of supported embeds</Link>.
        </ListItem>
        <ListItem>
          In addition to images for the post&apos;s content, you can also drag and drop a cover
          image.
        </ListItem>
      </UnorderedList>
    </CommonEffect>
  );
}

export default function NewRight() {
  const { suggestionField } = useContext(NewSuggestionContext);

  return (
    <Box pos="relative" w="full" h="full">
      <Box pos="sticky" top={suggestionField?.y}>
        <TitleSuggestion />
        <TagsSuggestion />
        <BodySuggestion />
      </Box>
    </Box>
  );
}
