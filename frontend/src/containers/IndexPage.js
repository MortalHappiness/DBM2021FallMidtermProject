import { Box } from "@mui/system";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function IndexPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  });

  return (
    <Box>
      <h1>IndexPage</h1>
    </Box>
  );
}
