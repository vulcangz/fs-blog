import { Textarea, TextareaProps } from "@chakra-ui/react";
import { forwardRef } from "react";
import ResizeTextarea, { TextareaAutosizeProps } from "react-textarea-autosize";

export type AutoResizeTextareaProps = TextareaProps &
  Omit<TextareaAutosizeProps, "style">;

export const AutoResizeTextarea = forwardRef<
  HTMLTextAreaElement,
  AutoResizeTextareaProps
>((props, ref) => {
  return (
    <Textarea
      {...props}
      ref={ref}
      as={ResizeTextarea}
      variant="unstyled"
      p="0"
      overflow="hidden"
      resize="none"
    />
  );
});

AutoResizeTextarea.displayName = "AutoResizeTextarea";
