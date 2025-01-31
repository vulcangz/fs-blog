/* eslint-disable react/display-name */

import {
  forwardRef,
  ReactElement,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { FieldValues, Path, PathValue, useFormContext, useWatch } from 'react-hook-form';
import { AutoResizeTextarea, AutoResizeTextareaProps } from '../textarea/auto-resize-textarea';
import { EditorTool } from './editor-tools';

export type EditorRef = HTMLTextAreaElement & {
  onClickTool: (tool: EditorTool) => void;
};

type EditorProps<T> = AutoResizeTextareaProps & {
  controlKey: keyof T;
};

export const Editor = forwardRef(({ controlKey, ...props }, ref) => {
  type T = { [key: string]: string };
  const { register, setValue, control } = useFormContext<T>();
  const controlKeyPath = controlKey as Path<T>;
  const { ref: refCallback, ...registerItem } = register(controlKeyPath);
  const [selection, setSelection] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const value = useWatch({ control })[controlKeyPath];

  function add(character: string) {
    const textarea = textareaRef.current!;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    textarea.focus({ preventScroll: false });

    setValue(
      controlKeyPath,
      value!.substring(0, start) + '\n' + character + '\n' + value!.substring(start)
    );
    setSelection({
      start: textarea.selectionStart + character.length + 2,
      end: textarea.selectionEnd + character.length + 2
    });
  }

  function addOrRemove(character: string) {
    const textarea = textareaRef.current!;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentString = value!.substring(start, end);
    const prevChar = start === 0 || value!.charAt(start - 1) === '\n' ? '' : '\n';
    const afterChar = end === value!.length || value!.charAt(end) === '\n' ? '' : '\n';

    textarea.focus({ preventScroll: false });

    if (currentString.indexOf(character) === 0) {
      setValue(
        controlKeyPath,
        value!.substring(0, start) + value!.substring(start + character.length)
      );
      setSelection({
        start: textarea.selectionStart,
        end: textarea.selectionEnd - character.length
      });
    } else {
      setValue(
        controlKeyPath,
        (value!.substring(0, start) +
          prevChar +
          character +
          value!.substring(start, end) +
          afterChar +
          value!.substring(end)) as PathValue<T, Path<T>>
      );
      setSelection({
        start: textarea.selectionStart + (prevChar ? 1 : 0),
        end: textarea.selectionEnd + character.length + (prevChar ? 1 : 0) + (afterChar ? 1 : 0)
      });
    }
  }

  function addOrRemoveBoth(character: string, numberOfChar: number) {
    const textarea = textareaRef.current!;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    let charString = character.repeat(numberOfChar);

    textarea.focus({ preventScroll: false });

    if (start !== end) {
      if (
        // |**bold**|
        value!.substring(start, start + numberOfChar) === charString &&
        value!.substring(end - numberOfChar, end) === charString
      ) {
        // Remove
        setValue(
          controlKeyPath,
          value!.substring(0, start) +
            value!.substring(start + numberOfChar, end - numberOfChar) +
            value!.substring(end + numberOfChar)
        );
        setSelection({
          start: textarea.selectionStart,
          end: textarea.selectionEnd - numberOfChar * 2
        });
      } else if (
        // **|bold|**
        value!.substring(start - numberOfChar, start) === charString &&
        value!.substring(end, end + numberOfChar) === charString
      ) {
        // Remove
        setValue(
          controlKeyPath,
          value!.substring(0, start - numberOfChar) +
            value!.substring(start, end) +
            value!.substring(end + numberOfChar)
        );
        setSelection({
          start: textarea.selectionStart - numberOfChar,
          end: textarea.selectionEnd - numberOfChar
        });
      } else {
        setValue(
          controlKeyPath,
          (charString + value!.substring(start, end) + charString) as PathValue<T, Path<T>>
        );
        setSelection({
          start: textarea.selectionStart,
          end: textarea.selectionEnd + numberOfChar * 2
        });
      }
    } else {
      charString = character.repeat(numberOfChar * 2);
      if (value!.substring(start - numberOfChar, end + numberOfChar) === charString) {
        // Remove
        setValue(
          controlKeyPath,
          value!.substring(0, start - numberOfChar) + value!.substring(start + numberOfChar)
        );
        setSelection({
          start: textarea.selectionStart - numberOfChar,
          end: textarea.selectionStart - numberOfChar
        });
      } else {
        setValue(
          controlKeyPath,
          (value!.substring(0, start) + charString + value!.substring(start)) as PathValue<
            T,
            Path<T>
          >
        );
        setSelection({
          start: textarea.selectionStart + numberOfChar,
          end: textarea.selectionStart + numberOfChar
        });
      }
    }
  }

  function onSelect() {
    const textarea = textareaRef.current!;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setSelection({ start, end });
  }

  useEffect(() => {
    if (!selection || !textareaRef.current) {
      return;
    }
    const { start, end } = selection;
    textareaRef.current.focus();
    textareaRef.current.setSelectionRange(start, end);
  }, [selection]);

  useImperativeHandle(
    ref,
    () =>
      ({
        onClickTool: (tool) => {
          if (!textareaRef.current) {
            return;
          }

          switch (tool) {
            case 'BOLD':
              addOrRemoveBoth('*', 2);
              break;
            case 'ITALIC':
              addOrRemoveBoth('_', 1);
              break;
            case 'CODE':
              addOrRemoveBoth('`', 1);
              break;
            case 'STRIKETHROUGH':
              addOrRemoveBoth('~', 2);
              break;
            case 'ORDERED_LIST':
              addOrRemove('1. ');
              break;
            case 'UNORDERED_LIST':
              addOrRemove('- ');
              break;
            case 'QUOTE':
              addOrRemove('> ');
              break;
            case 'LINE_DIVIDER':
              add('---');
              break;
          }
        },
        getBoundingClientRect: () => textareaRef.current?.getBoundingClientRect()
      } as EditorRef)
  );

  if (value === undefined) {
    return <></>;
  }

  return (
    <AutoResizeTextarea
      {...registerItem}
      {...props}
      ref={(e) => {
        refCallback(e);
        textareaRef.current = e;
      }}
      onSelect={onSelect}
    />
  );
}) as <T extends FieldValues>(p: EditorProps<T> & { ref?: RefObject<EditorRef> }) => ReactElement;
