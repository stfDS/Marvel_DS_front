const AddEllipsis = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default AddEllipsis;
