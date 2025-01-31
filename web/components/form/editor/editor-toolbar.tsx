import {
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
} from "@chakra-ui/react";
import { forwardRef, RefObject, useCallback, useState } from "react";
// import { MdOutlineMoreVert } from "react-icons/md";
import { MdMoreVert } from '@react-icons/all-files/md/MdMoreVert';
import { useResizeDetector } from "react-resize-detector";
import { EditorRef } from "./editor";
import {
  DEFAULT_EDITOR_TOOLS,
  EditorTool,
  EditorToolsData,
} from "./editor-tools";

type EditorToolbarProps = ButtonGroupProps & {
  editorRef: RefObject<EditorRef>;
  tools?: EditorTool[];
};
type ToolDisplay = {
  nav: EditorTool[];
  popup: EditorTool[];
};

export const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(
  ({ editorRef, tools, ...props }, _) => {
    const [displayTools, setDisplayTools] = useState<ToolDisplay>({
      nav: [],
      popup: [],
    });
    const [openPopup, setOpenPopup] = useState(false);

    const onResize = useCallback(
      ({ width, height, entry }) => {
        if (width) {
          const toolsNumberCanDisplay = Math.floor(width / 52 - 4);
          const nav: EditorTool[] = [];
          const popup: EditorTool[] = [];
          (tools || DEFAULT_EDITOR_TOOLS).forEach((tool, i) => {
            if (i < toolsNumberCanDisplay) {
              nav.push(tool);
            } else {
              popup.push(tool);
            }
          });

          setDisplayTools({ nav, popup });
        }
      },
      [tools]
    );

    const { ref } = useResizeDetector({
      handleHeight: false,
      onResize,
    });

    function onClick(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      tool: EditorTool
    ) {
      e.preventDefault();
      editorRef.current?.onClickTool(tool);
    }

    return (
      <ButtonGroup {...props} ref={ref}>
        {displayTools.nav.map((tool) => (
          <Tooltip
            label={EditorToolsData[tool].label}
            openDelay={350}
            key={tool}
          >
            <IconButton
              onClick={(e) => onClick(e, tool)}
              aria-label={EditorToolsData[tool].label}
              icon={EditorToolsData[tool].icon}
              fontSize={props.fontSize}
            />
          </Tooltip>
        ))}

        {displayTools.popup.length > 0 && (
          <Popover
            onOpen={() => setOpenPopup(true)}
            onClose={() => setOpenPopup(false)}
            placement="bottom-end"
            gutter={4}
          >
            <PopoverTrigger>
              <IconButton
                aria-label="More options"
                icon={<MdMoreVert />}
                fontSize={props.fontSize}
                bg={openPopup ? "grey.200" : undefined}
                ml="auto !important"
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent w="auto">
                <PopoverBody mx="-1">
                  <ButtonGroup variant={props.variant} spacing={props.spacing}>
                    {displayTools.popup.map((tool) => (
                      <Tooltip
                        label={EditorToolsData[tool].label}
                        openDelay={350}
                        key={tool}
                      >
                        <IconButton
                          onClick={(e) => onClick(e, tool)}
                          aria-label={EditorToolsData[tool].label}
                          icon={EditorToolsData[tool].icon}
                          fontSize={props.fontSize}
                        />
                      </Tooltip>
                    ))}
                  </ButtonGroup>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </ButtonGroup>
    );
  }
);

EditorToolbar.displayName = "EditorToolbar";
