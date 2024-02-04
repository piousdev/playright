import { Save, Star, Trash2 } from "lucide-react";
import { ChangeEvent, useState } from 'react';
import Editor from "../components/playground/editor.tsx";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import useFile, { ErrorResponse, NetworkError } from '../hooks/useFile.ts';
import { FileDTO } from '../models/filedto.ts';
import getIframeSrcDoc from '../utils/getIframeSrcDoc.ts';

interface PlaygroundProps {
  displayName: string;
  initialData: FileDTO | null;
  collections: Collection[] | unknown;
}

interface Collection {
  name: string;
  items: CollectionItem[];
}

interface CollectionItem {
  name: string;
  content: string;
  fileIds : string[],
}

type SavedFile = {
  id: string;
  userId: string;
  name: string;
  description: string;
  content: string;
  language: string;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  currentVersionId: string | null;
  collectionId: string | null;
}

// type SavedCollection = {
//   id: string;
//   userId: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   items: SavedCollectionItem[];
// }

// type SavedCollectionItem = {
//   id: string;
//   name: string;
//   content: string;
//   createdAt: string;
//   updatedAt: string;
//   collectionId: string;
// }

const Playground = ({ displayName, initialData }: PlaygroundProps) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [cssContent, setCssContent] = useState<string>("");
  const [jsContent, setJsContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // eslint-disable-next-line prefer-const
  let { saveFile, isLoading } = useFile();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const documentTitle = `${title || displayName || 'untitled'}`;

  const handleSaveFile = async () => {
    const iframeDocument = {
      documentTitle: "My Document",
      cssContent: "body { background-color: green; }",
      htmlContent: "<h1>Hello World</h1>",
      jsContent: "console.log('Hello World')"
    };

    const fileContent = getIframeSrcDoc(iframeDocument).trim();
    const fileData = {
      id: initialData?.id,
      userId: initialData?.userId,
      name: documentTitle,
      description: description,
      content: fileContent,
      language: cssContent && htmlContent && jsContent ? 'html/css/js' : '',
      starred: initialData?.starred || false,
      createdAt: initialData?.createdAt,
      updatedAt: initialData?.updatedAt,
      currentVersionId: initialData?.currentVersionId,
      collectionId: initialData?.collectionId
    }

    console.log("Preparing to save file with body:", fileData);

    const onSuccess = (file: SavedFile) => {
      console.log(`Saved File: ${file}`);
    };

    const onError = (error: ErrorResponse | NetworkError) => {
      console.log(`Error saving file: ${error}`);
    };

    await saveFile(fileData, onSuccess, onError);
  };

  return (
      <>
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex flex-row gap-2">
            <Input
              className=""
              value={title}
              onChange={handleTitleChange}
              placeholder="Choose a title..."
            />
            <Input
              className="text-sm text-foreground"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe you game..."
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button className="flex space-x-2" size="default" variant="outline">
              <span className="text-md">Star</span>
              <Star className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="outline">
              <Trash2 className="w-4 h-4 text-forground" />
            </Button>
            <Button
              onClick={handleSaveFile}
              className="flex space-x-2"
              size="default"
              variant="outline"
            >
              <span className="text-md">Save</span>
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <ResizablePanelGroup direction="vertical" className="px-8">
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={30}>
                <Editor
                  language="html"
                  onChange={setHtmlContent}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <Editor
                  language="css"
                  onChange={setCssContent}
                />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={30}>
                <Editor
                  language="javascript"
                  onChange={setJsContent}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={50}>
            <div className="iframe">
              <iframe
                className=""
                title="output"
                sandbox="allow-scripts"
                srcDoc={getIframeSrcDoc({
                  documentTitle,
                  cssContent,
                  htmlContent,
                  jsContent,
                })}
                style={{
                  border: "none",
                }}
                width="100%"
                height="100%"
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </>
    );
};

export default Playground;