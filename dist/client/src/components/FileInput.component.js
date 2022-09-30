"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./FileInput.styles.css");
const react_1 = require("react");
const FileInput = ({ setImageUpload }) => {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)();
    const [preview, setPreview] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);
    const onSelectFile = (e) => {
        if (!e.target.files) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setImageUpload(e.currentTarget.files[0]);
    };
    return className = 'file-input-container' >
        id;
    'choose-file';
    type = 'file';
    accept = '.jpg, .jpeg, .png, .gif';
    // multiple
    onChange = { onSelectFile }
        > /input>;
    {
        selectedFile && className;
        'preview-div' >
            id;
        'preview-img';
        alt = 'preview';
        src = { preview }
            /  >
            /figure>;
    }
};
/div>;
;
;
exports.default = FileInput;
