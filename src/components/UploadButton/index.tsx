import { useState, useCallback, useRef, useEffect } from 'react';

export const UploadButton = ({ onUpload, className = '' }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const onFileChanged = useCallback(e => {
    setFile(e.target.files[0]);
  }, []);

  const handleFileUpload = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [fileInputRef]);

  useEffect(() => {
    if (file) {
      const filereader = new FileReader();
      filereader.onload = onUpload;
      filereader.readAsText(file as Blob);
    }
  }, [file, onUpload]);

  return (
    <div className={className} onClick={handleFileUpload}>
      <input
        ref={fileInputRef}
        type="file"
        accept="json"
        style={{ display: 'none' }}
        onChange={onFileChanged}
      />
      <span className='cursor-default'>Импорт .json</span>
    </div>
  )

}