"use client";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import basicTheme from "./themes/BasicTheme";
import { ImageNode } from "./nodes/Image/ImageNode";
import { EquationNode } from "./nodes/Math/EquationNode";
import { ImagePlugin } from "./plugins/ImagePlugin";
import CodeBlockPlugin from "./plugins/CodeBlockPlugin";
import { EquationListenerPlugin } from "./plugins/EquationListenerPlugin";
import EditorBehaviourPlugin from "./plugins/EditorBehaviourPlugin";
import { EditorCommandsPlugin } from "./plugins/EditorCommands";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingElements/FloatingTextToolbar";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingElements/FloatingLinkEditor";
import FloatingEquationEditorPlugin from "./plugins/FloatingElements/FloatingEquationEditor";
import FloatingBlockToolbarPlugin from "./plugins/FloatingElements/FloatingBlockToolbar";
import CodeActionMenuPlugin from "./plugins/FloatingElements/CodeActionMenu";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { ListItemNode, ListNode } from "@lexical/list";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState } from "lexical";
import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";

export default function Editor({
  editorStateRef,
}: {
  editorStateRef: React.MutableRefObject<EditorState | null>;
}) {
  const initialConfig = {
    editorState: null,
    namespace: "MyEditor",
    onError(error: Error) {
      throw error;
    },
    nodes: [
      ImageNode,
      EquationNode,
      CodeHighlightNode,
      CodeNode,
      HeadingNode,
      LinkNode,
      QuoteNode,
      ListNode,
      ListItemNode,
    ],
    theme: basicTheme,
  };

  const AutoFocus = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      editor.focus();
    }, [editor]);

    return <></>;
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container relative">
        <div className="editor-inner">
          <RichTextPlugin
            placeholder={
              <span className="absolute top-1 left-[10rem] text-gray-400">
                Tell your story...
              </span>
            }
            contentEditable={
              <ContentEditable
                className="editor-input relative"
                spellCheck={false}
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={(editorState) => {
              if (editorStateRef !== null) {
                editorStateRef.current = editorState;
              }
            }}
            ignoreHistoryMergeTagChange
            ignoreSelectionChange
          />
          <AutoFocus />
          <LinkPlugin />
          <HistoryPlugin />
          <FloatingLinkEditorPlugin />
          <ImagePlugin />
          <CodeBlockPlugin />
          <EquationListenerPlugin />
          <FloatingEquationEditorPlugin />
          <EditorBehaviourPlugin />
          <EditorCommandsPlugin />
          <FloatingTextFormatToolbarPlugin />
          <FloatingBlockToolbarPlugin />
          <CodeActionMenuPlugin />
          <ListPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
