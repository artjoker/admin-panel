import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { StyledWrapper, StyledLabel } from './RichTextEditorStyles';

type TRichTextEditorProps = ReactQuillProps & {
  label?: string;
  withRequiredMark?: boolean;
  id?: string;
};

const RichTextEditor = ({
  label,
  withRequiredMark,
  id,
  ...rest
}: TRichTextEditorProps) => {
  return (
    <StyledWrapper id={id}>
      <StyledLabel>
        {label}
        {!!withRequiredMark && <i>*</i>}
      </StyledLabel>
      <ReactQuill {...rest} />
    </StyledWrapper>
  );
};

export default RichTextEditor;
