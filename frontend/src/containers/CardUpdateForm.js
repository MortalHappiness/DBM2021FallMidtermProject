import { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { UPDATE_CARD_MUTATION } from "../graphql";

export default function CardUpdateForm() {
  const [updateCard] = useMutation(UPDATE_CARD_MUTATION);

  // ========================================

  // Handle input fields
  const [input, setInput] = useState({
    id: "",
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
    updateCard({
      variables: {
        id: input.id,
        data: { title: input.title, content: input.content },
      },
    });
  };

  // ========================================
  return (
    <div>
      <Typography variant="h5" component="h1">
        Update Card
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          required
          id="id"
          label="ID"
          name="id"
          value={input.id}
          onChange={handleChange}
        />
        <TextField
          type="text"
          id="title"
          label="Title"
          name="title"
          value={input.title}
          onChange={handleChange}
        />
        <TextField
          type="text"
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
