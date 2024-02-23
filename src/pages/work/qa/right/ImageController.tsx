import { Box, IconButton, styled, useTheme } from "@mui/material";
import { IconPin, IconPinFilled } from "@tabler/icons-react";
import { useRef, useState } from "react";
import FilerobotImageEditor, {
  FilerobotImageEditorConfig,
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

type Props = {
  source: string | HTMLImageElement;
};

const ImageController = (props: Props) => {
  const theme = useTheme();

  const currentImageRef = useRef<HTMLCanvasElement | null>(null);
  const currentImageWrapperRef = useRef<HTMLElement | null>(null);

  const [isFixImage, setIsFixImage] = useState(false);
  const [fixHeightImage, setFixHeightImage] = useState(0);

  const imageEditorTopbarHeight = 41;

  const handleChangeIsFixImage = () => {
    setIsFixImage(!isFixImage);

    if (currentImageWrapperRef.current) {
      setFixHeightImage(
        currentImageWrapperRef.current.clientHeight - imageEditorTopbarHeight
      );
    }
  };

  return (
    <ImageControllerContainer
      ref={currentImageWrapperRef}
      isFixImage={isFixImage}
      fixHeightImage={fixHeightImage}
    >
      <FixImageButton isFixImage={isFixImage} onClick={handleChangeIsFixImage}>
        {isFixImage ? <IconPinFilled /> : <IconPin />}
      </FixImageButton>
      <FilerobotImageEditor
        source={props.source}
        annotationsCommon={{
          fill: "#333333",
        }}
        Text={{ text: "내용을 적어주세요." }}
        Rotate={{ angle: 90, componentType: "buttons" }}
        tabsIds={[TABS.ANNOTATE]}
        defaultTabId={TABS.ANNOTATE}
        defaultToolId={TOOLS.TEXT}
        savingPixelRatio={1}
        previewPixelRatio={1}
        getCurrentImgDataFnRef={currentImageRef}
        theme={{
          palette: {
            "bg-secondary": theme.palette.background.paper,
          },
        }}
        showBackButton
        removeSaveButton
        noCrossOrigin
      />
    </ImageControllerContainer>
  );
};

export default ImageController;

const FixImageButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "isFixImage",
})<{ isFixImage: boolean }>(({ theme, isFixImage }) => ({
  position: "absolute",
  left: "4px",
  top: "1px",
  zIndex: 100,
  color: isFixImage ? theme.palette.primary.main : theme.palette.grey[400],
}));

const ImageControllerContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "isFixImage" && prop !== "fixHeightImage",
})<{ isFixImage: boolean; fixHeightImage: number }>(
  ({ theme, isFixImage, fixHeightImage }) => ({
    height: "100%",

    "& .FIE_root": {
      minHeight: "fit-content",
    },

    "& .FIE_canvas-container": {
      padding: 0,
      minHeight: "fit-content",
      height: isFixImage ? fixHeightImage : "100%",
      maxWidth: "calc(100% - 50px)",
    },

    "& .FIE_topbar": {
      padding: "4px",
    },

    "& .FIE_tabs": {
      display: "none",
    },

    "& .FIE_canvas-node": {
      backgroundColor: theme.palette.background.paper,
    },

    "& .FIE_editor-content": {
      flexDirection: "row-reverse",
    },

    "& .FIE_tools-wrapper": {
      minWidth: "fit-content",
    },

    "& .FIE_tools-bar-wrapper": {
      width: "50px",
      height: "auto",
      maxHeight: "fit-content",
      display: "flex",
      flexDirection: "column-reverse",
      overflowY: "auto",
      overflowX: "hidden",
    },

    "& .FIE_tools-bar": {
      height: "auto",
      flexDirection: "column",
      overflow: "visible",
    },
    "& .FIE_tools-item-wrapper > div": {
      gap: 0,
    },
    "& .FIE_tools-items": {
      display: "flex",
      flexDirection: "column",
    },

    "& .SfxLabel-text": {
      display: "none",
    },

    "& .FIE_tool-options-wrapper": {
      maxHeight: "max-content",
      flexDirection: "column",
    },

    "& .FIE_annotations-options": {
      padding: 0,
      textAlign: "center",
      width: "100%",

      "& > div": {
        maxWidth: "100%",
        flexDirection: "column",
      },
    },

    "& .itTFEb": {
      marginLeft: 0,
    },

    "& .FIE_text-size-option": {
      padding: "8px 4px",
    },

    // font selectbox
    ".SfxSelect-Container": {
      display: "none",
    },

    "& .FIE_topbar-save-wrapper": {
      minWidth: "fit-content !important",
    },
  })
);
