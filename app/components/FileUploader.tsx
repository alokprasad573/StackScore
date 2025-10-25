
import React,{ useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { formatSize } from '~/lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }: FileUploaderProps) => {
    const [file, setFile] = useState<File | null>(null)

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const selectedFile = acceptedFiles[0] || null;
            setFile(selectedFile);
            onFileSelect?.(selectedFile);
        },
        [onFileSelect]
    )

    const maxFileSize = 20 * 1024 * 1024

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf'] },
        maxSize: maxFileSize,
    })

    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center space-x-3">
                                <img src="/images/pdf.png" alt="pdf" className="size-10" />
                                <div>
                                    <p className="text-sm text-gray-700 truncate max-w-xs">
                                       {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {formatSize(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-alias" onClick={(e) => {
                                e.stopPropagation();
                                setFile(null);
                                onFileSelect?.(null);
                            }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-2">
                                <img src="/icons/info.svg" alt="upload" className="size-16 sm:size-20" />
                            </div>
                            <p className="text-base sm:text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to Upload
                                </span>
                            </p>
                            <p className="text-sm sm:text-base text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader;