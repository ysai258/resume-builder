import React, { useState } from "react";
import "./AutoCompleteTags.css";
import { WithContext as ReactTags } from "react-tag-input";

const AutoCompleteFeild = ({
  data = [],
  placeholder = "add tag",
  initialTags = [],
  onDelete = () => {},
  onAdd = () => {},
}) => {
  const suggestions = data.map((val, ind) => {
    return {
      id: ind.toString(),
      text: val,
    };
  });

  const initTag = initialTags.map((val, ind) => {
    return {
      id: ind.toString(),
      text: val,
    };
  });

  const [tags, setTags] = useState(initTag);
  const handleDelete = (i) => {
    onDelete(i);
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    onAdd(tag.text);
    setTags([...tags, tag]);
  };
  return (
    <ReactTags
      placeholder={placeholder}
      tags={tags}
      suggestions={suggestions}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      inputFieldPosition="inline"
      allowDragDrop={false}
      autocomplete
      classNames={{ tagInputField: "form-control" }}
      autofocus={false}
    />
  );
};

export default AutoCompleteFeild;
