import { useState } from 'react';

import { Box, Select } from '@mantine/core';
import { Editor } from '@monaco-editor/react';

export type EditorLanguage = {
  id: string;
  label: string;
};

const DEFAULT_LANGUAGES: EditorLanguage[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
  { id: 'json', label: 'JSON' },
  { id: 'markdown', label: 'Markdown' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'csharp', label: 'C#' },
  { id: 'cpp', label: 'C++' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'sql', label: 'SQL' },
  { id: 'xml', label: 'XML' },
  { id: 'yaml', label: 'YAML' },
];

type CodeEditorProperties = {
  defaultLanguage?: string;
  defaultValue?: string;
  height?: string;
  languages?: EditorLanguage[];
  onLanguageChange?: (language: string) => void;
};

export default function CodeEditor({
  defaultLanguage = 'javascript',
  defaultValue = '// some comment',
  height = '90vh',
  languages = DEFAULT_LANGUAGES,
  onLanguageChange,
}: Readonly<CodeEditorProperties>) {
  const availableLanguages = languages.length > 0 ? languages : DEFAULT_LANGUAGES;
  const initialLanguage = availableLanguages.some(({ id }) => id === defaultLanguage) ? defaultLanguage : availableLanguages[0].id;
  const [language, setLanguage] = useState(initialLanguage);

  function handleLanguageChange(nextLanguage: string) {
    setLanguage(nextLanguage);
    onLanguageChange?.(nextLanguage);
  }

  return (
    <Box className="code-editor" component="section">
      <Select
        label="Language"
        allowDeselect={false}
        className="code-editor-language"
        comboboxProps={{ withinPortal: false }}
        data={availableLanguages.map(({ id, label }) => ({ label, value: id }))}
        value={language}
        onChange={(value) => value && handleLanguageChange(value)}
      />
      <Editor defaultValue={defaultValue} height={height} language={language} />
    </Box>
  );
}
