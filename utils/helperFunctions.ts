export const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "OPEN":
      "green";
      break;
    case "IN_PROGRESS":
      "blue";
      break;
    case "CLOSED":
      "red";
      break;
    default:
      "gray";
  }
};
