import { Button, Dialog, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import validator from "validator";
import ReactPlayer from "react-player";
import "./Modal.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setDescription,
  setLinks,
  setMediaLink,
} from "../redux/slices/notesSlice";

export const Modal = ({ open, handleDialog, saveNote, updateNote }) => {
  const title = useSelector((state) => state.notes.title);
  const description = useSelector((state) => state.notes.description);
  const mediaLink = useSelector((state) => state.notes.mediaLink);
  const links = useSelector((state) => state.notes.links);
  const currentSelection = useSelector((state) => state.notes.currentSelection);
  const dispatch = useDispatch();

  const handleTitleChange = (e) => {
    dispatch(setTitle(e.target.value));
  };

  const handleDescriptionChange = (value) => {
    dispatch(setDescription(value));
  };

  const handleMediaLinkChange = (e) => {
    dispatch(setMediaLink(e.target.value));
  };

  const handleMediaLinkValidation = () => {
    if (validator.isURL(mediaLink)) {
      if (!links.includes(mediaLink)) {
        dispatch(setLinks([...links, mediaLink]));
      } else {
        alert("Media already added");
      }
      dispatch(setMediaLink(""));
    } else {
      alert("Invalid link! Please enter a valid URL.");
    }
  };

  const removeMedia = (link) => {
    const filteredList = links.filter((each) => each !== link);
    dispatch(setLinks(filteredList));
  };

  const getAttachments = () => {
    if (links.length > 0) {
      return links.map((each, index) => {
        const isImage =
          each.endsWith(".jpg") ||
          each.endsWith(".jpeg") ||
          each.endsWith(".png");
        return isImage ? (
          <div className="eachMediaItem" key={index}>
            <CloseIcon
              className="closeIcon"
              onClick={() => removeMedia(each)}
            />
            <img src={each} className="mediaPreview" alt="Media" />
          </div>
        ) : (
          <div className="eachMediaItem" key={index}>
            <CloseIcon
              className="closeIcon"
              onClick={() => removeMedia(each)}
            />
            <ReactPlayer url={each} controls width={250} height={150} />
          </div>
        );
      });
    }
  };

  const saveAndClearFields = () => {
    if (title === "") {
      alert("Title cannot be empty!");
    } else {
      dispatch(setTitle(null));
      dispatch(setDescription(null));
      dispatch(setLinks([]));
      saveNote({
        title: title,
        description: description,
        links: links,
      });
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          width: "80vw",
          height: "100%",
          padding: "2%",
        },
      }}
    >
      <div className="dialogContent">
        <CloseIcon className="closeIcon" onClick={handleDialog} />
        <TextField
          required
          size="small"
          name="title"
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <ReactQuill
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
          className="quillEditor"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              [{ color: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "color",
          ]}
        />
        <div className="emptyContainer1" />
        <div className="mediaAddContainer">
          <TextField
            size="small"
            name="mediaLink"
            fullWidth
            label="Add media link"
            className="mediaInputField"
            value={mediaLink}
            onChange={handleMediaLinkChange}
          />
          <Button
            className="addButton"
            variant="contained"
            color="secondary"
            onClick={handleMediaLinkValidation}
          >
            Add
          </Button>
        </div>
        <div className="previewContainer">{getAttachments()}</div>
        <div className="emptyContainer2" />
        {currentSelection === "addNew" ? (
          <Button
            variant="outlined"
            color="secondary"
            className="saveButton"
            onClick={saveAndClearFields}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            className="saveButton"
            onClick={() =>
              updateNote({
                title: title,
                description: description,
                links: links,
              })
            }
          >
            Update
          </Button>
        )}
      </div>
    </Dialog>
  );
};
