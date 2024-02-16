import { Box, Button, styled } from "@mui/material";
import { IconReceipt } from "@tabler/icons-react";
import FilerobotImageEditor, {
  FilerobotImageEditorConfig,
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";

type Props = {
  source: Pick<FilerobotImageEditorConfig, "source">;
};

const SimpleImageController = () => {
  const handleCurrentImageInfo = (imageInfo: any) => {
    console.log(imageInfo);
  };

  return (
    // <SimpleImageControllerContainer
    //   source={`https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png`}
    //   annotationsCommon={{
    //     fill: "#333333",
    //   }}
    //   Text={{ text: "내용을 적어주세요." }}
    //   Rotate={{ angle: 90, componentType: "buttons" }}
    //   tabsIds={[TABS.ANNOTATE]}
    //   defaultTabId={TABS.ANNOTATE}
    //   defaultToolId={TOOLS.TEXT}
    //   showBackButton
    //   removeSaveButton
    //   showCanvasOnly
    //   style={{}}
    // />

    <SimpleImageControllerContainer>
      <FilerobotImageEditor
        source={`https://upload.wikimedia.org/wikipedia/commons/c/c3/LibreOffice_Writer_6.3.png`}
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
        getCurrentImgDataFnRef={handleCurrentImageInfo}
        showBackButton
        // removeSaveButton
        // showCanvasOnly
        moreSaveOptions={[
          {
            label: "Save as new version",
            onClick: (triggerSaveModal, triggerSave) =>
              triggerSaveModal(() => {
                console.log("saved");
              }), // Required to pass the callback function
            icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>', // HTML Element as string
          },
          {
            label: "Save as new file",
            onClick: (triggerSaveModal, triggerSave) =>
              triggerSave(() => {
                console.log("saved");
              }), // Required to pass the callback function
            icon: () => (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                ...
              </svg>
            ), // React Function component
          },
        ]}
      />
    </SimpleImageControllerContainer>
  );
};

export default SimpleImageController;

const SimpleImageControllerContainer = styled(Box)(({ theme }) => ({
  height: "100%",

  "& .FIE_canvas-container": {
    padding: 0,
  },

  //   "& .FIE_tabs": {
  //     display: "none",
  //   },

  //   "& .FIE_editor-content": {
  //     flexDirection: "row-reverse",
  //   },

  //   "& .FIE_tools-wrapper": {
  //     minWidth: "fit-content",
  //   },

  //   "& .FIE_tools-bar-wrapper": {
  //     width: "50px",
  //     height: "100%",
  //     maxHeight: "fit-content",
  //     display: "flex",
  //     flexDirection: "column-reverse",
  //   },

  //   "& .FIE_tools-bar": {
  //     height: "100%",
  //     flexDirection: "column",
  //   },
  //   "& .FIE_tools-item-wrapper > div": {
  //     gap: 0,
  //   },
  //   "& .FIE_tools-items": {
  //     display: "flex",
  //     flexDirection: "column",
  //   },

  //   "& .SfxLabel-text": {
  //     display: "none",
  //   },

  //   "& .FIE_tool-options-wrapper": {
  //     maxHeight: "max-content",
  //     flexDirection: "column",
  //   },

  //   // font selectbox
  //   ".SfxSelect-Container": {
  //     display: "none",
  //   },
}));
