import React,{Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange= (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Create Article..."
        />
        
        <textarea
          name='content'
          rows="4"
          required="required"
          disabled
          className="undefined"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
};


export default TextEditor;