import { defaultKeymap } from '@codemirror/commands'
import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { javascript } from '@codemirror/lang-javascript'
import { EditorState } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { useEffect, useRef } from 'react'
import { BiLogoCss3, BiLogoHtml5, BiLogoJavascript } from 'react-icons/bi'
import { materialDark } from './material-dark.ts'

interface EditorProps {
    language: string;
    className?: string;
    onChange: (_content: string) => void;
}

const greetings = "Greetings, circus";

const languagePlaceholder = (language: string) => {
    switch (language) {
        case 'javascript':
            return `console.log("${greetings}")`;
        case 'html':
            return `<p>${greetings}</p>`;
        case 'css':
            return `p { color: default;}`;
        default:
            return '';
    }
}

const languageExtension = (language: string) => {
    switch (language) {
        case 'javascript':
            return javascript();
        case 'html':
            return html();
        case 'css':
            return css();
        default:
            return [];
    }
};

const getLanguageIcon = (language: string) => {
    switch (language) {
        case 'javascript':
            return <BiLogoJavascript className='text-2xl text-yellow-400' />;
        case 'html':
            return <BiLogoHtml5 className='text-2xl text-orange-500' />;
        case 'css':
            return <BiLogoCss3 className='text-2xl text-blue-500' />;
        default:
            return null;
    }
}

const theme = materialDark;

export default function Editor({ language, onChange }: EditorProps) {
	const editorRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
        // console.log("Editor useEffect: Current theme", theme);
        if (!editorRef.current) return;

        const updateListener = EditorView.updateListener.of((update) => {
            if (update.changes) {
                onChange(update.state.doc.toString());
            }
        });

      // console.log("theme returns:", theme);

        const startState = EditorState.create({
            doc: languagePlaceholder(language),
            extensions: [
                basicSetup,
                updateListener,
                theme, // materialDark,
                keymap.of(defaultKeymap),
                languageExtension(language)
            ]
        });

        // console.log("Editor: Creating new EditorView with theme", theme);

        const view = new EditorView({
            state: startState,
            parent: editorRef.current
        });

        return () => {
            // console.log("Editor: Destroying EditorView with theme", theme);
            view.destroy();
        };
    }, [language, onChange]);

	return (
		<div>
			<div className='flex justify-between items-center p-[0.5em]'>
				{getLanguageIcon(language)}
			</div>
			<div ref={editorRef} className='h-96' />
		</div>
	)

}