import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { CREATE_CARD_MUTATION } from "../graphql";

export default function CardCreationForm() {
  const [createCard] = useMutation(CREATE_CARD_MUTATION);

  // ========================================

  // Handle input fields
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const handleChange = useCallback(
    (e) => {
      const name = e.target.name;
      setInput({
        ...input,
        [name]: e.target.value,
      });
    },
    [input]
  );

  // ========================================

  const handleSubmit = (e) => {
    e.preventDefault();
    createCard({ variables: { data: input } });
  };

  // ========================================
  return (
    <div>
      <Typography variant="h5" component="h1">
        Create Card
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          required
          id="title"
          label="Title"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <TextField
          type="text"
          required
          id="content"
          label="Content"
          name="content"
          value={input.content}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Enter
        </Button>
      </form>
    </div>
  );
}
