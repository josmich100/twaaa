import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { Alert } from "reactstrap";
import { stateToHTML } from "draft-js-export-html";
import { EditorState } from "draft-js";

import { createPostArticle } from "../../api/main";
import ArticlesEditor from "../../subcomponents/Editor/Draft/ArtclesEditor";
import Sidebar from "subcomponents/Sidebar";
import MainLayout from "layouts/MainLayout";

const MIN_ARTICLE_EDITOR_LENGTH = 150;

class StructuredArticle extends Component {
  state = {
    groupId: this.props.match.params.groupId,
    organizationId: this.props.match.params.organizationId,
    headline: { value: "" },
    privacy: { value: 0 },
    articlecontent: "",
    lessonfile: "",
    imagePreviewUrl: "",
    posting: false,
    editorState: EditorState.createEmpty(),
    editorInfoText: "",
    editorCurrentLength: 0,
  };

  handleInputChange(event, validationFun) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: {
        value: inputValue,
      },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ posting: true });
    const { headline, privacy } = this.state;
    const { groupId, organizationId } = this.props.match.params;
    const isGroup = groupId !== undefined;
    const isPrivateIfGroupPost =
      isGroup?.toString() === "true" && +privacy.value === 0;
    const isOrganizationPost = organizationId !== undefined;

    event.preventDefault();
    const data = new FormData();

    data.set("heading", headline.value);
    if (isGroup) {
      data.set("privacy", privacy.value);
    }
    data.set(
      "content",
      stateToHTML(this.state.editorState)
    );

    if (this.state.lessonfile.name) {
      data.append(
        "postfile",
        this.state.lessonfile,
        this.state.lessonfile.name
      );
    }
    if (this.state.editorCurrentLength < 150) {
      this.setState({
        editorInfoText:
          "The minimum text for article body must be at lease 150 characters",
      });
      return;
    }
    createPostArticle(
      data,
      isGroup,
      groupId,
      isOrganizationPost,
      organizationId
    )
      .then((res) => {
        if (res?.data?.success === true) {
          this.setState({
            articlecontent: "",
            headline: { value: "" },
            lessonfile: "",
          });
          if (!isGroup && !isPrivateIfGroupPost && !isOrganizationPost) {
            this.props.history.push("/timeline");
          }

          if (
            (isGroup && isPrivateIfGroupPost) ||
            (isGroup && !isPrivateIfGroupPost)
          ) {
            this.props.history.push("/grouptimeline/" + groupId);
          }

          if (isOrganizationPost) {
            this.props.history.push("/organizationtimeline/" + organizationId);
          }
        }
      })
      .catch((err) => {})
      .finally(() => {
        this.setState({ posting: false });
      });
  };
  _handleImageChange(e) {
    e.preventDefault();

    // let reader = new FileReader();
    let file = e.target.files[0];
    this.setState({
      lessonfile: file,
      imagePreviewUrl: URL.createObjectURL(file),
    });
  }
  onChangeEditor = (editorState) => {
    this.setState({
      editorState,
      editorCurrentLength: this.state.editorState
        .getCurrentContent()
        .getPlainText("").length,
    });
  };

  render() {
    let groupId = this.props.match.params.groupId;
    // let organizationId = this.props.match.params.organizationId;
    let isGroup = groupId !== undefined;
    // const isOrganization = organizationId !== undefined;
    return (
      <MainLayout>
        <Sidebar />
        <div className="cw-w">
          <section className="central-meta item" style={{ height: "100%" }}>
            <div className="container">
              <div className="row">
                <div className="col-xl-4">
                  <Link to="/articles" className="twaalinks">
                    <span className="twaabluecolor">
                      Twaa Articles&nbsp;&gt;&nbsp;
                    </span>
                    <span className="twaagoldcolor">New Article</span>
                  </Link>
                </div>

                <div className="col-xl-4 text-center"></div>

                <div className="col-xl-4 text-right">
                  <Link
                    to="/articles"
                    className="twaalinks"
                    onClick={this.toggle}
                  >
                    <span className="twaagoldcolor">View Articles</span>
                  </Link>
                </div>
              </div>
              <hr className="twaasplit" />
              <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                <div className="imageupload p-relative w-100">
                  {/* {this.state.lessonfile != null && */}
                  <div className="row">
                    <div className="bannerpicture" style={{ height: "224px" }}>
                      <img
                        alt=""
                        className="bannerpic"
                        style={{ maxWidth: "100%" }}
                        src={this.state.imagePreviewUrl}
                      />
                    </div>
                  </div>
                  <div className="upload-btn-wrapper my-3 mt-5">
                    <input
                      className="h-100 w-100"
                      type="file"
                      name="file"
                      placeholder="Select Article Image"
                      required
                      ref={(input) => (this.inputElement = input)}
                      onChange={(e) => this._handleImageChange(e)}
                      accept="image/*"
                      style={{ display: "inline" }}
                    />
                    <Link
                      title="Click to select article image"
                      to="#"
                      className="fas fa-edit twaagoldcolor"
                      style={{
                        fontSize: "50px",
                        marginBottom: "-20px",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                  <textarea
                    type="text"
                    name="headline"
                    value={this.state.headline.value}
                    onChange={(event) =>
                      this.handleInputChange(event, this.validateName)
                    }
                    className="form-control"
                    placeholder="Article Heading"
                    required
                  />
                </div>
                {isGroup && (
                  <div style={{ marginTop: "25px", marginBottom: "25px" }}>
                    <select
                      className="form-control my-4"
                      name="privacy"
                      value={this.state.privacy.value}
                      onChange={(event) =>
                        this.handleInputChange(event, this.validateName)
                      }
                    >
                      <option value="" disabled selected>
                        Choose the privacy of this article
                      </option>
                      <option value="0">Private Article</option>
                      <option value="1">Public Article</option>
                    </select>
                  </div>
                )}
                <div style={{ position: "relative" }}>
                  {this.state.editorCurrentLength < MIN_ARTICLE_EDITOR_LENGTH &&
                    this.state.editorInfoText.length > 1 && (
                      <div>
                        <Alert color="danger" className="py-1">
                          <b className="twaagoldcolor">
                            {this.state.editorInfoText}
                          </b>
                        </Alert>
                      </div>
                    )}

                  <ArticlesEditor
                    onStateChange={this.onChangeEditor}
                    editorState={this.state.editorState}
                  />
                  <div className="text-right">
                    Entered text count: {this.state.editorCurrentLength}
                  </div>
                </div>
                <div className="my-2 text-right">
                  <button
                    disabled={this.state.posting}
                    className="btn btn_twaagold"
                  >
                    {this.state.posting
                      ? "Publishing Article Please Wait..."
                      : "Publish Article"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </MainLayout>
    );
  }

  validateValue = (name) => {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  };
}

export default withRouter(StructuredArticle);
