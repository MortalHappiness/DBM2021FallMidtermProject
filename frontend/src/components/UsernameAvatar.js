import Avatar from "@mui/material/Avatar";

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

function stringAvatar(name, size) {
  const ret = {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0],
  };
  if (size !== undefined) {
    ret.sx.width = ret.sx.height = size;
  }
  return ret;
}

export default function UsernameAvatar({ username, size }) {
  return <Avatar {...stringAvatar(username, size)} />;
}
