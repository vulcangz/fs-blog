import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  Tooltip,
  useBoolean
} from '@chakra-ui/react';
import { ChangeEvent, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AiOutlineClose } from '@react-icons/all-files/ai/AiOutlineClose';
import { NewSuggestionContext } from './suggestion-context';
import { Editor, EditorRef } from '@/components/form/editor/editor';
import { EditorToolbar } from '@/components/form/editor/editor-toolbar';
import { AutoResizeTextarea } from '@/components/form/textarea/auto-resize-textarea';
import { EditPost, Response, Tag, TagListResData } from '@/interfaces';
import { axiosInstance } from '@/lib/fetcher';
import { useTopTags } from '@/services/queries';
import { createTag } from '@/services/apis';
import { FilterParams, FilterObject, getContentFilterQuery } from '@/services/filter';

function CoverPhoto() {
  const { register, setValue, control } = useFormContext<EditPost>();
  const { cover_image, cover_image_url } = useWatch({ control });
  const [preview, setPreview] = useState<string>('');
  const imageRef = useRef<HTMLInputElement>(null);

  function onClickUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setValue('cover_image', e.target.files[0]);
    }
  }

  useEffect(() => {
    if (!cover_image) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(cover_image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [cover_image]);

  useEffect(() => {
    if (!preview && imageRef.current) {
      imageRef.current.value = '';
    }
  }, [preview]);

  return (
    <Flex mb="5" align="center">
      {(cover_image || cover_image_url) && (
        <Image
          src={preview || cover_image_url}
          alt="Post cover"
          h="105px"
          w="250px"
          objectFit="scale-down"
          overflowWrap="anywhere"
          borderRadius="md"
        />
      )}

      <Tooltip label="Use ratio of 100:42 for best results">
        <Button onClick={() => imageRef.current?.click()} variant="rock">
          {cover_image || cover_image_url ? 'Change' : 'Add a cover image'}
        </Button>
      </Tooltip>
      {(cover_image || cover_image_url) && (
        <Button
          onClick={() => {
            setValue('cover_image', null);
            setValue('cover_image_url', undefined);
          }}
          variant="flat"
          colorScheme="red"
          color="red"
        >
          Remove
        </Button>
      )}
      <Input
        {...register('cover_image')}
        ref={imageRef}
        onChange={onClickUpload}
        type="file"
        accept="image/*"
        display="none"
      />
      {!!cover_image && <Box />}
    </Flex>
  );
}

function Title() {
  const { setSuggestionField } = useContext(NewSuggestionContext);
  const { register } = useFormContext<EditPost>();
  const { ref: refCallback, ...registerItem } = register('title');
  const ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <Box mb="2">
      <AutoResizeTextarea
        {...registerItem}
        ref={(e) => {
          refCallback(e);
          ref.current = e;
        }}
        onFocus={() =>
          setSuggestionField({
            name: 'title',
            y: ref.current?.getBoundingClientRect().y || 0
          })
        }
        w="full"
        minH="unset"
        placeholder="New post title here..."
        fontSize="5xl"
        fontWeight="800"
      />
    </Box>
  );
}

function Tags() {
  const { setSuggestionField } = useContext(NewSuggestionContext);
  const { setValue, control, reset } = useFormContext<EditPost>();
  const { tags, tagObjs } = useWatch({ control });
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpenPopup, setIsOpenPopup] = useBoolean();
  const [editingTagIndex, setEditingTagIndex] = useState(-1);
  const [page, setPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState<any[]>([]);

  const { data, isLoading, error } = useTopTags(page);
  if (error) console.log('something was wrong: ' + error.message);

  console.log('tagobjs=', tagObjs);
  useEffect(() => {
    if (tagObjs) {
      setSelectedTags(tagObjs);
    }
  }, [tagObjs, reset]);

  if (!data) {
    return <></>;
  }

  const topTags = data.data.items;

  const restTags = async (name: string) => {
    const params: FilterParams = {
      filter: {
        name: {
          $like: name.trim()
        } as FilterObject
      }
    };

    const qs = getContentFilterQuery(params);
    const res = await axiosInstance.get<Response<TagListResData>>(`/content/tag/?${qs}`);
    if (res.data.data.total > 0) {
      console.log('restTags resp=', res);
      return res.data.data.items;
    }

    return null;
  };

  function onClickTag(index: number) {
    console.log('onClickTag index=', index);
    setEditingTagIndex(index);
    const input = inputRef.current;
    if (!input) {
      return;
    }

    input.focus();
    input.value = tags![index];
  }

  async function inputTags(tag?: string) {
    if (!tag) {
      return;
    }

    if (tag.length > 4) {
      return;
    }

    // todo: add it to tag table
    console.log('inputTags editingTagIndex=', editingTagIndex);

    const loadingTags = await restTags(tag);
    if (loadingTags && loadingTags.length > 0) {
      return [...loadingTags, ...topTags];
    }

    const newTag = await createTag(tag);
    if (!newTag) {
      return;
    }
    console.log('inputTags newTag=', newTag);

    tag = newTag.id.toString() as string;
    setSelectedTags([...selectedTags, newTag]);

    if (editingTagIndex !== -1) {
      setValue(
        'tags',
        tags!.reduce<string[]>((acc, curr, i) => {
          if (i !== editingTagIndex) {
            acc.push(curr);
          } else if (tag) {
            acc.push(tag);
          }
          return acc;
        }, [])
      );
    } else {
      if (!tags!.includes(tag)) {
        setValue('tags', [...tags!, tag]);
      }
    }
  }

  function updateTags(tag?: Tag) {
    if (typeof tag === 'string') {
      return;
    }
    if (!tag) {
      return;
    }

    console.log('updateTags tag=', tag);
    const tagIDStr = tag.id.toString();
    if (editingTagIndex !== -1) {
      setValue(
        'tags',
        tags!.reduce<string[]>((acc, curr, i) => {
          console.log('updateTags acc=', acc, ' curr=', curr, ' i=', i);
          if (i !== editingTagIndex) {
            acc.push(curr);
          } else if (tag.id) {
            acc.push(tagIDStr);
          }
          console.log('updateTags acc=', acc);
          return acc;
        }, [])
      );
      setSelectedTags([...selectedTags, tag]);
    } else {
      if (!tags!.includes(tagIDStr)) {
        console.log('updateTags tag=', tag.name, '还未选过.');
        setValue('tags', [...tags!, tagIDStr]);
        setSelectedTags([...selectedTags, tag]);
      }
    }
  }

  function onBlur() {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    inputTags(input.value);

    setTimeout(() => {
      if (document.activeElement !== input) {
        setEditingTagIndex(-1);
        setIsOpenPopup.off();
        input.value = '';
      }
    }, 200);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const input = inputRef.current;
    if (!input) {
      return;
    }

    const notPreventKeyList = ['Backspace', 'Delete', 'ArrowRight', 'ArrowLeft'];

    if ((!notPreventKeyList.includes(e.key) && e.key.length > 1) || !/\w/.test(e.key)) {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      inputTags(input.value);
      setIsOpenPopup.off();
      setEditingTagIndex(-1);
      input.value = '';
    }
  }

  return (
    <Box pos="relative">
      <Popover
        isOpen={isOpenPopup}
        onClose={setIsOpenPopup.off}
        autoFocus={false}
        matchWidth={true}
      >
        <PopoverTrigger>
          <List w="full" display="flex" flexWrap="wrap">
            {/* Tags */}
            {selectedTags.map((tag, index) => (
              <ListItem
                key={tag.id}
                display={editingTagIndex === index ? 'none' : ''}
                order={index + 1}
              >
                <ButtonGroup variant="tag" size="sm" isAttached mr="1" mb="1">
                  <Button
                    onClick={() => onClickTag(index)}
                    px="1"
                    fontWeight="400"
                    fontSize="md"
                    cursor="text"
                  >
                    # {tag.name}
                  </Button>
                  <IconButton
                    onClick={() => {
                      if (tags && tags?.length > 0) {
                        setValue(
                          'tags',
                          tags.filter((v) => v !== tag.id.toString())
                        );
                      }
                      setSelectedTags(selectedTags.filter((v) => v.id !== tag.id));
                    }}
                    aria-label={`Remove ${tag.name}`}
                    icon={<AiOutlineClose />}
                    px="1"
                    fontSize="xl"
                    _hover={{ color: 'red' }}
                  />
                </ButtonGroup>
              </ListItem>
            ))}

            {/* Input to add item */}
            <ListItem
              alignSelf="center"
              order={editingTagIndex !== -1 ? editingTagIndex + 1 : tags && tags.length + 1}
            >
              <Input
                ref={inputRef}
                variant="unstyled"
                placeholder={tags && tags.length ? 'Add another...' : 'Add up to 4 tags...'}
                onClick={setIsOpenPopup.on}
                onFocus={() =>
                  setSuggestionField({
                    name: 'tags',
                    y: inputRef.current?.getBoundingClientRect().y || 0
                  })
                }
                onKeyDown={onKeyDown}
                onBlur={() => onBlur()}
                px="0.5"
                py="px"
              />
            </ListItem>
          </List>
        </PopoverTrigger>

        {/* Popup */}
        <Portal containerRef={popupRef}>
          <PopoverContent w="auto">
            <PopoverHeader p="3">
              <Heading fontSize="lg">Top tags</Heading>
            </PopoverHeader>
            <PopoverBody p="1" maxH="500px" overflow="auto">
              <List>
                {topTags
                  .filter((item) => tags?.indexOf(item.id.toString()) === -1)
                  .map((item) => (
                    <ListItem key={item.name} cursor="pointer">
                      <Box
                        onClick={() => updateTags(item)}
                        p="3"
                        borderRadius="md"
                        _hover={{ backgroundColor: 'grey.100' }}
                      >
                        <Box fontWeight="500">#{item.name}</Box>
                        <Text noOfLines={2} fontSize="sm">
                          {item.description}
                        </Text>
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      {/* Tag wrapper */}
      <Box ref={popupRef} pos="absolute" top="8" w="full" bg="red" />
    </Box>
  );
}

function Body() {
  const { setSuggestionField } = useContext(NewSuggestionContext);
  // const editorRef = useRef<EditorRef>(null);
  const editorRef: RefObject<any> = useRef<EditorRef>(null);

  return (
    <Flex px="16" py="8" flexDir="column" flexGrow="1">
      <EditorToolbar
        editorRef={editorRef}
        variant="flat"
        spacing="1"
        size="md"
        pos="sticky"
        mx="-16"
        mb="6"
        px="16"
        py="2"
        bg="#f9f9f9"
        fontSize="xl"
        flexShrink="0"
      />

      <Editor<EditPost>
        ref={editorRef}
        onFocus={() =>
          setSuggestionField({
            name: 'content',
            y: editorRef.current?.getBoundingClientRect().y || 0
          })
        }
        controlKey="content"
        minRows={8}
        fontSize="lg"
        placeholder="Write your post content here..."
      />
    </Flex>
  );
}

export default function NewMainEdit() {
  return (
    <>
      <Box px="16" py="8">
        <CoverPhoto />
        <Title />
        <Tags />
      </Box>

      <Body />
    </>
  );
}
