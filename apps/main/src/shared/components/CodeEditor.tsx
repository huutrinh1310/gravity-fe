import { useState } from "react";
import Editor from "@monaco-editor/react";

export type EditorLanguage = {
  id: string;
  label: string;
};

const DEFAULT_LANGUAGES: EditorLanguage[] = [
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "json", label: "JSON" },
  { id: "markdown", label: "Markdown" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "csharp", label: "C#" },
  { id: "cpp", label: "C++" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "sql", label: "SQL" },
  { id: "xml", label: "XML" },
  { id: "yaml", label: "YAML" },
];

type CodeEditorProps = {
  defaultLanguage?: string;
  defaultValue?: string;
  height?: string;
  languages?: EditorLanguage[];
  onLanguageChange?: (language: string) => void;
};

export default function CodeEditor({
  defaultLanguage = "javascript",
  defaultValue = "// some comment",
  height = "90vh",
  languages = DEFAULT_LANGUAGES,
  onLanguageChange,
}: CodeEditorProps) {
  const availableLanguages = languages.length > 0 ? languages : DEFAULT_LANGUAGES;
  const initialLanguage = availableLanguages.some(({ id }) => id === defaultLanguage)
    ? defaultLanguage
    : availableLanguages[0].id;
  const [language, setLanguage] = useState(initialLanguage);

  function handleLanguageChange(nextLanguage: string) {
    setLanguage(nextLanguage);
    onLanguageChange?.(nextLanguage);
  }

  return (
    <section className="flex min-h-0 flex-col gap-2">
      <label className="flex w-fit items-center gap-2 text-sm font-medium" htmlFor="code-editor-language">
        <span>Language</span>
        <select
          className="rounded-md border border-border bg-background px-2 py-1 text-sm"
          id="code-editor-language"
          onChange={(event) => handleLanguageChange(event.target.value)}
          value={language}
        >
          {availableLanguages.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <Editor defaultValue={defaultValue} height={height} language={language} />
    </section>
  );
}
